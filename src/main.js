import TripMainInfoView from './view/trip-main-info';
import MenuView from './view/menu';
import FilterView from './view/filter';
import SortView from './view/sort';
import TripEventView from './view/trip-event';
import TotalCostView from './view/total-cost';
import TripEventListView from './view/trip-event-list';
import EventEditFormView from './view/event-edit-form';
import {generateTripEvent} from './mock/trip-event-mock';
import {generateFilter} from './mock/filter';
import {RenderPosition, render} from './utils';

const TRIP_POINT_COUNT = 15;

const tripEvents = new Array(TRIP_POINT_COUNT).fill().map(generateTripEvent);
const filters = generateFilter(tripEvents);

const siteHeaderElem = document.querySelector('header');
const tripMainElem = siteHeaderElem.querySelector('.trip-main');
const tripEventElem = document.querySelector('.trip-events');

const renderEvent = (eventListElement, event) => {
  const eventComponent = new TripEventView(event);
  const eventEditComponent = new EventEditFormView(event);

  const replaceEventToForm = () => {
    eventListElement.replaceChild(eventEditComponent.getElement(), eventComponent.getElement());
  };

  const replaceFormToEvent = () => {
    eventListElement.replaceChild(eventComponent.getElement(), eventEditComponent.getElement());
  };

  eventComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceEventToForm();
  });

  eventEditComponent.getElement()./*querySelector('.event__save-btn').*/addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceFormToEvent();
  });

  render(eventListElement, eventComponent.getElement(), RenderPosition.BEFOREEND);
};

render(tripMainElem, new TripMainInfoView().getElement(), RenderPosition.AFTERBEGIN);
render(tripMainElem.querySelector('.trip-main__trip-info'), new TotalCostView().getElement(), RenderPosition.BEFOREEND);

const tripControlsNavigationElem = tripMainElem.querySelector('.trip-controls__navigation');
render(tripControlsNavigationElem, new MenuView().getElement(), RenderPosition.BEFOREEND);

const tripControlsFilterElem = tripMainElem.querySelector('.trip-controls__filters');
render(tripControlsFilterElem, new FilterView(filters).getElement(), RenderPosition.BEFOREEND);

const tripEventList = new TripEventListView();
render(tripEventElem, tripEventList.getElement(), RenderPosition.BEFOREEND);
render(tripEventList.getElement(), new SortView().getElement(), RenderPosition.BEFOREEND);

for (let i = 0; i < TRIP_POINT_COUNT; i++) {
  renderEvent(tripEventList.getElement(), tripEvents[i]);
}
