import AbstractObserver from '../utils/abstract-observer.js';

export default class Offers extends AbstractObserver {
  constructor() {
    super();
    this._offers = new Map();
  }

  setOffers(updateType, offers) {
    // this._offers = offers.slice();
    offers.forEach((offer) => this._offers.set(offer.type, offer.offers));
    this._notify(updateType);
  }

  getOffers() {
    return this._offers;
  }
}
