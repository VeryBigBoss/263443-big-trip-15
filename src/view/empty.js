import AbstractView from './abstract.js';
import {FilterType} from '../const.js';

const emptyPointsTextType = {
  [FilterType.EVERYTHING]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no past events now',
  [FilterType.PAST]: 'There are no future events now',
};

const createEmptyTemplate = (filterType) => {
  const emptyPointsTextValue = emptyPointsTextType[filterType];
  return  `<p class="trip-events__msg">
    ${emptyPointsTextValue}
    </p>`;
};

export default class Empty extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
  }

  getTemplate() {
    return createEmptyTemplate(this._data);
  }
}
