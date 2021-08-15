import AbstractView from './abstract.js';

const createEmptyTemplate = () => ('<p class="trip-events__msg">Click New Event to create your first point</p>');

export default class Empty extends AbstractView {

  getTemplate() {
    return createEmptyTemplate();
  }
}
