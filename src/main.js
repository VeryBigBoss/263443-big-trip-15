import TripMainInfoView from './view/trip-main-info';
import MenuView from './view/menu';
import FilterView from './view/filter';
import SortView from './view/sort';
import TripEventView from './view/trip-event';
import TotalCostView from './view/total-cost';
import TripEventListView from './view/trip-event-list';
import EventEditFormView from './view/event-edit-form';
import EmptyView from './view/empty';
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

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToEvent();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  eventComponent.getElement().querySelector('.event__rollup-btn').addEventListener('click', () => {
    replaceEventToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  eventEditComponent.getElement()./*querySelector('.event__save-btn').*/addEventListener('submit', (evt) => {
    evt.preventDefault();
    replaceFormToEvent();
    document.addEventListener('keydown', onEscKeyDown);
  });

  render(eventListElement, eventComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderTripList = (tripListContainer, tripsEvents) => {
  if (tripEvents.length === 0) {
    render(tripListContainer, new EmptyView().getElement(), RenderPosition.BEFOREEND);
    return;
  }

  const tripEventList = new TripEventListView();
  render(tripListContainer, tripEventList.getElement(), RenderPosition.BEFOREEND);
  render(tripEventList.getElement(), new SortView().getElement(), RenderPosition.BEFOREEND);
  tripsEvents.forEach((tripEvent) => renderEvent(tripEventList.getElement(), tripEvent));
};

render(tripMainElem, new TripMainInfoView().getElement(), RenderPosition.AFTERBEGIN);
render(tripMainElem.querySelector('.trip-main__trip-info'), new TotalCostView().getElement(), RenderPosition.BEFOREEND);

const tripControlsNavigationElem = tripMainElem.querySelector('.trip-controls__navigation');
render(tripControlsNavigationElem, new MenuView().getElement(), RenderPosition.BEFOREEND);

const tripControlsFilterElem = tripMainElem.querySelector('.trip-controls__filters');
render(tripControlsFilterElem, new FilterView(filters).getElement(), RenderPosition.BEFOREEND);
renderTripList(tripEventElem, tripEvents);
