import AbstractObserver from '../utils/abstract-observer.js';

export default class Destinations extends AbstractObserver {
  constructor() {
    super();
    this._destinations = new Map();
  }

  setDestinations(updateType, destinations) {
    // destinations.forEach((destination) => this._destinations.set(destination.type, destination.offers));
    this._destinations = destinations;
    this._notify(updateType);
  }

  getDestinations() {
    return this._destinations;
  }
}
