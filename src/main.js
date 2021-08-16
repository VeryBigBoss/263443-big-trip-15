import TripMainInfoView from './view/trip-main-info';
import MenuView from './view/menu';
import FilterView from './view/filter';
import TotalCostView from './view/total-cost';
import {generateTripEvent} from './mock/trip-event-mock';
import {generateFilter} from './mock/filter';
import {render, RenderPosition} from './utils/render';
import TripPresenter from './presenter/trip';

const TRIP_POINT_COUNT = 15;

const tripEvents = new Array(TRIP_POINT_COUNT).fill().map(generateTripEvent);
const filters = generateFilter(tripEvents);

const siteHeaderElem = document.querySelector('header');
const tripMainElem = siteHeaderElem.querySelector('.trip-main');
const tripEventElem = document.querySelector('.trip-events');

render(tripMainElem, new TripMainInfoView(), RenderPosition.AFTERBEGIN);
render(tripMainElem.querySelector('.trip-main__trip-info'), new TotalCostView(), RenderPosition.BEFOREEND);

const tripControlsNavigationElem = tripMainElem.querySelector('.trip-controls__navigation');
render(tripControlsNavigationElem, new MenuView(), RenderPosition.BEFOREEND);

const tripControlsFilterElem = tripMainElem.querySelector('.trip-controls__filters');
render(tripControlsFilterElem, new FilterView(filters), RenderPosition.BEFOREEND);
// renderTripList(tripEventElem, tripEvents);
const tripPresenter = new TripPresenter(tripEventElem);
tripPresenter.init(tripEvents);

