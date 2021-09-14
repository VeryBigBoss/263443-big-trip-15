import TripMainInfoView from './view/trip-info';
import MenuView from './view/menu';
import StatisticsView from './view/statistic.js';
import TotalCostView from './view/total-cost';
import {generatePoint} from './mock/point-mock';
import PointsModel from './model/point.js';
import FilterModel from './model/filter.js';
import {remove, render, RenderPosition} from './utils/render';
import TripPresenter from './presenter/trip';
import FilterPresenter from './presenter/filter.js';
import {MenuItem, UpdateType, FilterType} from './const.js';

const TRIP_POINT_COUNT = 15;

const points = new Array(TRIP_POINT_COUNT).fill().map(generatePoint);

const pointsModel = new PointsModel();
pointsModel.setPoints(points);

const filterModel = new FilterModel();

const siteHeaderElem = document.querySelector('header');
const tripMainElem = siteHeaderElem.querySelector('.trip-main');
const statMainElem = document.querySelector('.page-body__page-main > .page-body__container');
const pointElem = document.querySelector('.trip-events');
const menuComponent = new MenuView(false);
const pointNewBtnElem = tripMainElem.querySelector('.trip-main__event-add-btn');

render(tripMainElem, new TripMainInfoView(), RenderPosition.AFTERBEGIN);
render(tripMainElem.querySelector('.trip-main__trip-info'), new TotalCostView(), RenderPosition.BEFOREEND);

const tripControlsNavigationElem = tripMainElem.querySelector('.trip-controls__navigation');
render(tripControlsNavigationElem, menuComponent, RenderPosition.BEFOREEND);

const tripControlsFilterElem = tripMainElem.querySelector('.trip-controls__filters');
const tripPresenter = new TripPresenter(pointElem, pointsModel, filterModel);
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
      // menuPresenter.changeMenu(MenuItem.TABLE);
      menuComponent.setMenuItem(MenuItem.TABLE);
      remove(statComponent);
      filterModel.setDisabled(false);
      filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
      pointNewBtnElem.disabled = false;
      break;
    case MenuItem.STATS:
      statComponent = new StatisticsView(pointsModel.getPoints());
      render(statMainElem, statComponent, RenderPosition.BEFOREEND);
      // menuPresenter.changeMenu(MenuItem.STATS);
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
menuComponent.setMenuClickHandler(handleSiteMenuClick);

filterPresenter.init();
tripPresenter.init();

