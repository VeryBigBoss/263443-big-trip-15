import {createTripMainInfo} from './view/trip-main-info';
import {createMenuTemplate} from './view/menu';
import {createFilterTemplate} from './view/filter';
import {createSort} from './view/sort';
import {createTripPointTemplate} from './view/trip-event';
import {createTotalCostTemplate} from './view/total-cost';
import {createTripEventListTemplate} from './view/trip-event-list';
import {createEventEditForm} from './view/event-edit-form';

const TRIP_POINT_COUNT = 3;

const render = (container, template, place) => (
  container.insertAdjacentHTML(place, template)
);

const siteHeaderElem = document.querySelector('header');
const tripMainElem = siteHeaderElem.querySelector('.trip-main');
render(tripMainElem, createTripMainInfo(), 'afterbegin');
render(tripMainElem.querySelector('.trip-main__trip-info'), createTotalCostTemplate(), 'beforeend');

const tripControlsNavigationElem = tripMainElem.querySelector('.trip-controls__navigation');
render(tripControlsNavigationElem, createMenuTemplate(), 'beforeend');

const tripControlsFilterElem = tripMainElem.querySelector('.trip-controls__filters');
render(tripControlsFilterElem, createFilterTemplate(), 'beforeend');

const siteMainElem = document.querySelector('main');
const tripEventListElem = siteMainElem.querySelector('.trip-events');
render(tripEventListElem, createSort(), 'beforeend');
render(tripEventListElem, createTripEventListTemplate(), 'beforeend');

for (let i = 0; i < TRIP_POINT_COUNT; i++) {
  render(tripEventListElem.querySelector('.trip-events__list'), createTripPointTemplate(), 'beforeend');
}

render(tripEventListElem.querySelector('.trip-events__item').firstElementChild, createEventEditForm(), 'beforebegin');
