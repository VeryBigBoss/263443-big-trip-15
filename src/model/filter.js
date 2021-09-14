import AbstractObserver from '../utils/abstract-observer.js';
import {FilterType} from '../const.js';

export default class Filter extends AbstractObserver {
  constructor() {
    super();
    this._activeFilter = FilterType.EVERYTHING;
    this._isDisabled = false;
  }

  setFilter(updateType, filter) {
    this._activeFilter = filter;
    this._notify(updateType, filter);
  }

  getFilter() {
    return this._activeFilter;
  }

  setDisabled(isDisabled) {
    this._isDisabled = isDisabled;
    this._notify();
  }

  getDisabled() {
    return this._isDisabled;
  }
}
