import MenuView from './view/menu';
import StatisticsView from './view/statistic.js';
import PointsModel from './model/point.js';
import FilterModel from './model/filter.js';
import OffersModel from './model/offer.js';
import DestinationsModel from './model/destination.js';
import {remove, render, RenderPosition} from './utils/render';
import TripPresenter from './presenter/trip';
import FilterPresenter from './presenter/filter.js';
import {MenuItem, UpdateType, FilterType} from './const.js';
import Api from './api.js';

const AUTHORIZATION = 'Basic hck5t7ufSwcl1sa2j';
const END_POINT = 'https://15.ecmascript.pages.academy/big-trip';

const api = new Api(END_POINT, AUTHORIZATION);

const pointsModel = new PointsModel();
const offersModel = new OffersModel();
const destinationsModel = new DestinationsModel();

const filterModel = new FilterModel();

const siteHeaderElem = document.querySelector('header');
const tripMainElem = siteHeaderElem.querySelector('.trip-main');
const tripControlsNavigationElem = tripMainElem.querySelector('.trip-controls__navigation');
const tripControlsFilterElem = tripMainElem.querySelector('.trip-controls__filters');
const pointNewBtnElem = tripMainElem.querySelector('.trip-main__event-add-btn');
const statMainElem = document.querySelector('.page-body__page-main > .page-body__container');
const pointElem = document.querySelector('.trip-events');
const menuComponent = new MenuView(false);

// render(tripMainElem, new TripMainInfoView(), RenderPosition.AFTERBEGIN);
// render(tripMainElem.querySelector('.trip-main__trip-info'), new TotalCostView(), RenderPosition.BEFOREEND);
const tripPresenter = new TripPresenter(pointElem, pointsModel, offersModel, destinationsModel, filterModel, api);
const filterPresenter = new FilterPresenter(tripControlsFilterElem, filterModel, pointsModel);
let statComponent = null;

const handlePointNewFormClose = () => {
  pointNewBtnElem.disabled = false;
};

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.ADD_NEW_POINT:
      menuComponent.setMenuItem(MenuItem.TABLE);
      remove(statComponent);
      tripPresenter.destroy();
      filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
      filterModel.setDisabled(false);
      tripPresenter.init();
      tripPresenter.createPoint(handlePointNewFormClose);
      pointNewBtnElem.disabled = true;
      break;
    case MenuItem.TABLE:
      tripPresenter.init();
      menuComponent.setMenuItem(MenuItem.TABLE);
      remove(statComponent);
      filterModel.setDisabled(false);
      filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
      pointNewBtnElem.disabled = false;
      break;
    case MenuItem.STATS:
      statComponent = new StatisticsView(pointsModel.getPoints());
      render(statMainElem, statComponent, RenderPosition.BEFOREEND);
      menuComponent.setMenuItem(MenuItem.STATS);
      filterModel.setDisabled(true);
      tripPresenter.destroy();
      pointNewBtnElem.disabled = true;
      break;
  }
};

pointNewBtnElem.addEventListener('click', (evt) => {
  evt.preventDefault();
  pointNewBtnElem.disabled = true;
  filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
  tripPresenter.createPoint(handlePointNewFormClose);
});

filterPresenter.init();
tripPresenter.init();

Promise.all([
  api.getPoints(),
  api.getOffers(),
  api.getDestinations(),
])
  .then((values) => {
    const [points, offers, destinations] = values;
    destinationsModel.setDestinations(UpdateType.MINOR, destinations);
    offersModel.setOffers(UpdateType.MINOR, offers);
    pointsModel.setPoints(UpdateType.INIT, points);
    render(tripControlsNavigationElem, menuComponent, RenderPosition.BEFOREEND);
    menuComponent.setMenuClickHandler(handleSiteMenuClick);
  })
  .catch(() => {
    pointsModel.setPoints(UpdateType.INIT, []);
    render(tripControlsNavigationElem, menuComponent, RenderPosition.BEFOREEND);
    menuComponent.setMenuClickHandler(handleSiteMenuClick);
  });
