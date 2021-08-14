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
import {render, RenderPosition, replace} from './utils/render';

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
    replace(eventEditComponent, eventComponent);
  };

  const replaceFormToEvent = () => {
    replace(eventComponent, eventEditComponent);
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      replaceFormToEvent();
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  eventComponent.setEditClickHandler(() => {
    replaceEventToForm();
    document.addEventListener('keydown', onEscKeyDown);
  });

  eventEditComponent.setFormSubmitHandler(() => {
    replaceFormToEvent();
    document.addEventListener('keydown', onEscKeyDown);
  });

  eventEditComponent.setFormRollupHandler(() => {
    replaceFormToEvent();
  });

  render(eventListElement, eventComponent, RenderPosition.BEFOREEND);
};

const renderTripList = (tripListContainer, tripsEvents) => {
  if (tripEvents.length === 0) {
    render(tripListContainer, new EmptyView(), RenderPosition.BEFOREEND);
    return;
  }

  const tripEventList = new TripEventListView();
  render(tripListContainer, tripEventList, RenderPosition.BEFOREEND);
  render(tripEventList, new SortView(), RenderPosition.BEFOREEND);
  tripsEvents.forEach((tripEvent) => renderEvent(tripEventList, tripEvent));
};

render(tripMainElem, new TripMainInfoView(), RenderPosition.AFTERBEGIN);
render(tripMainElem.querySelector('.trip-main__trip-info'), new TotalCostView(), RenderPosition.BEFOREEND);

const tripControlsNavigationElem = tripMainElem.querySelector('.trip-controls__navigation');
render(tripControlsNavigationElem, new MenuView(), RenderPosition.BEFOREEND);

const tripControlsFilterElem = tripMainElem.querySelector('.trip-controls__filters');
render(tripControlsFilterElem, new FilterView(filters), RenderPosition.BEFOREEND);
renderTripList(tripEventElem, tripEvents);
