import AbstractView from './abstract.js';

const createTripEventListTemplate = () => (
  `<ul class="trip-events__list">
   </ul>`
);

export default class TripEventList extends AbstractView {
  getTemplate() {
    return createTripEventListTemplate();
  }
}
