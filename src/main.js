import TripMainInfoView from './view/trip-info';
import MenuView from './view/menu';
// import StatisticsView from './view/statistic.js';
import TotalCostView from './view/total-cost';
import {generatePoint} from './mock/point-mock';
import PointsModel from './model/point.js';
import FilterModel from './model/filter.js';
import {render, RenderPosition} from './utils/render';
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
// const statMainElem = document.querySelector('.page-body__page-main');
const pointElem = document.querySelector('.trip-events');
const menuComponent = new MenuView();
const pointNewBtnElem = tripMainElem.querySelector('.trip-main__event-add-btn');

render(tripMainElem, new TripMainInfoView(), RenderPosition.AFTERBEGIN);
render(tripMainElem.querySelector('.trip-main__trip-info'), new TotalCostView(), RenderPosition.BEFOREEND);

const tripControlsNavigationElem = tripMainElem.querySelector('.trip-controls__navigation');
render(tripControlsNavigationElem, menuComponent, RenderPosition.BEFOREEND);

const tripControlsFilterElem = tripMainElem.querySelector('.trip-controls__filters');
const tripPresenter = new TripPresenter(pointElem, pointsModel, filterModel);
const filterPresenter = new FilterPresenter(tripControlsFilterElem, filterModel, pointsModel);

const handlePointNewFormClose = () => {
  pointNewBtnElem.disabled = false;
  menuComponent.setMenuItem(MenuItem.TABLE);
};

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.ADD_NEW_POINT:
      // Скрыть статистику
      // Показать доску
      // Показать форму добавления новой задачи
      // Убрать выделение с ADD NEW TASK после сохранения
      tripPresenter.destroy();
      filterModel.setFilter(UpdateType.MAJOR, FilterType.EVERYTHING);
      tripPresenter.init();
      tripPresenter.createPoint(handlePointNewFormClose);
      pointNewBtnElem.disabled = true;
      break;
    case MenuItem.TABLE:
      // Показать доску
      // Скрыть статистику
      tripPresenter.init();
      break;
    case MenuItem.STATS:
      // Скрыть доску
      // Показать статистику
      tripPresenter.destroy();
      break;
  }
};

menuComponent.setMenuClickHandler(handleSiteMenuClick);

filterPresenter.init();
tripPresenter.init();
// render(statMainElem, new StatisticsView(pointsModel.getPoints()), RenderPosition.BEFOREEND);

pointNewBtnElem.addEventListener('click', (evt) => {
  evt.preventDefault();
  tripPresenter.createPoint(handlePointNewFormClose);
});

