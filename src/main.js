import TripMainInfoView from './view/trip-info';
import MenuView from './view/menu';
import TotalCostView from './view/total-cost';
import {generatePoint} from './mock/point-mock';
import PointsModel from './model/point.js';
import FilterModel from './model/filter.js';
import {render, RenderPosition} from './utils/render';
import TripPresenter from './presenter/trip';
import FilterPresenter from './presenter/filter.js';

const TRIP_POINT_COUNT = 15;

const points = new Array(TRIP_POINT_COUNT).fill().map(generatePoint);

const pointsModel = new PointsModel();
pointsModel.setPoints(points);

const filterModel = new FilterModel();

const siteHeaderElem = document.querySelector('header');
const tripMainElem = siteHeaderElem.querySelector('.trip-main');
const pointElem = document.querySelector('.trip-events');

render(tripMainElem, new TripMainInfoView(), RenderPosition.AFTERBEGIN);
render(tripMainElem.querySelector('.trip-main__trip-info'), new TotalCostView(), RenderPosition.BEFOREEND);

const tripControlsNavigationElem = tripMainElem.querySelector('.trip-controls__navigation');
render(tripControlsNavigationElem, new MenuView(), RenderPosition.BEFOREEND);

const tripControlsFilterElem = tripMainElem.querySelector('.trip-controls__filters');
const tripPresenter = new TripPresenter(pointElem, pointsModel, filterModel);
const filterPresenter = new FilterPresenter(tripControlsFilterElem, filterModel, pointsModel);
filterPresenter.init();
tripPresenter.init();

document.querySelector('.trip-main__event-add-btn').addEventListener('click', (evt) => {
  evt.preventDefault();
  tripPresenter.createPoint();
});

