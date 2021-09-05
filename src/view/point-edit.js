import SmartView from '../view/smart.js';
import {humanizeDate} from '../utils/point';
import {DESTINATION, OFFERS, POINT_TYPES} from '../const';
import {CITIES} from '../const';

const createPointTypeItemTemplate = (type) => `<div class="event__type-item">
              <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type"
                     value="${type}">
              <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type}-1">${type}</label>
            </div>`;

const createPointTypeListTemplate = () => `<div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${POINT_TYPES.map((type) => createPointTypeItemTemplate(type)).join('')}
          </fieldset>
       </div>`;

const createCityListTemplate = (cities) => `${cities.map((city) => `<option value="${city}"></option>`).join('')}`;

const createAvailableOffersTemplate = (offers, isOffers) => isOffers ? `<section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
            <div class="event__available-offers">
        ${offers.map((offer) =>
    `<div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="${offer.title}${offer.price}" type="checkbox"
                   name="event-offer-${offer.title}">
            <label class="event__offer-label" for="${offer.title}${offer.price}">
              <span class="event__offer-title">${offer.title}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${offer.price}</span>
            </label>
          </div>`).join('')}
        </section>` : '';

const createDescriptionTemplate = (destination, isDescription) => isDescription ? `<p class="event__destination-description">${destination.description}</p>` : '';

const createPictureTemplate = (destination, isPicture) => isPicture ? `<div class="event__photos-container">
                      <div class="event__photos-tape">
                        ${destination.pictures.map((picture) => `<img class="event__photo" src="${picture.src}" alt="Event photo">`).join('')}
                      </div>
                    </div>` : '';

const createDestinationSectionTemplate = (destination, isDescription, isPicture) => isDescription || isPicture ? `
        <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        ${createDescriptionTemplate(destination, isDescription)}
        ${createPictureTemplate(destination, isPicture)}
        </section>
        </section>` : '';

const createDetailsTemplate = (offers, destination, isOffers, isDescription, isPicture) => (isOffers || (isDescription || isPicture)) ? `<section class="event__details">
    ${createAvailableOffersTemplate(offers, isOffers)}
    ${createDestinationSectionTemplate(destination, isDescription, isPicture)}
    </section>` : '';

const createPointEditForm = (data) => {
  const {type, city, cost, dateTimeBegin, dateTimeEnd, offers, destination, isOffers, isDescription, isPicture} = data;
  return `<form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
        ${createPointTypeListTemplate()}
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text"
               name="event-destination" value="${city}" list="destination-list-1">
        <datalist id="destination-list-1">
          ${createCityListTemplate(CITIES)}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time"
               value="${humanizeDate(dateTimeBegin)}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time"
               value="${humanizeDate(dateTimeEnd)}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${cost}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    ${createDetailsTemplate(offers, destination, isOffers, isDescription, isPicture)}
  </form>`;
};

export default class PointEdit extends SmartView {
  constructor(point) {
    super();
    this._data = PointEdit.parsePointToData(point);
    this._pointTypeChangeHandler = this._pointTypeChangeHandler.bind(this);
    this._cityChangeHandler = this._cityChangeHandler.bind(this);
    this._dateTimeBeginChangeHandler = this._dateTimeBeginChangeHandler.bind(this);
    this._dateTimeEndChangeHandler = this._dateTimeEndChangeHandler.bind(this);
    this._costChangeHandler = this._costChangeHandler.bind(this);
    this._offersChangeHandler = this._offersChangeHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._formRollupHandler = this._formRollupHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    return createPointEditForm(this._data);
  }

  reset(point) {
    this.updateData(
      PointEdit.parsePointToData(point),
    );
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setFormRollupHandler(this._callback.formRollup);
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector('.event__type-group')
      .addEventListener('change', this._pointTypeChangeHandler);
    this.getElement()
      .querySelector('.event__input--destination')
      .addEventListener('change', this._cityChangeHandler);
    this.getElement()
      .querySelector('.event__input--time')
      .addEventListener('click', this._dateTimeBeginChangeHandler);
    this.getElement()
      .querySelector('.event__input--time')
      .addEventListener('click', this._dateTimeEndChangeHandler);
    this.getElement()
      .querySelector('.event__input--price')
      .addEventListener('click', this._costChangeHandler);

    const offerElements = this.getElement().querySelectorAll('.event__offer-checkbox');
    if (offerElements.length > 0) {
      offerElements.forEach((elem) => elem.addEventListener('click', this._offersChangeHandler));
    }
  }

  _pointTypeChangeHandler(evt) {
    evt.preventDefault();
    const offersTarget = OFFERS.get(evt.target.value);
    this.updateData({
      type: evt.target.value,
      offers: offersTarget !== undefined ? offersTarget : null,
      isOffers: offersTarget !== undefined,
    }, false);
  }

  _cityChangeHandler(evt) {
    evt.preventDefault();
    let result = {};
    for (const dest of DESTINATION) {
      if (dest.name === evt.target.value) {
        result = dest;
      }
    }
    this.updateData({
      city: evt.target.value,
      destination: result,
      isDescription: result && result.description !== undefined,
      isPicture: result && result.pictures && result.pictures.length > 0,
    }, false);
  }

  _dateTimeBeginChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({
      dateTimeBegin: this._data.dateTimeBegin,
    }, true);
  }

  _dateTimeEndChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({
      dateTimeEnd: this._data.dateTimeEnd,
    }, true);
  }

  _costChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({
      cost: this._data.cost,
    }, true);
  }

  _offersChangeHandler(evt) {
    evt.target.toggleAttribute('checked');
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(PointEdit.parseDataToPoint(this._data));
  }

  _formRollupHandler(evt) {
    evt.preventDefault();
    this._callback.formRollup();
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().addEventListener('submit', this._formSubmitHandler);
  }

  setFormRollupHandler(callback) {
    this._callback.formRollup = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._formRollupHandler);
  }

  static parsePointToData(point) {
    return Object.assign(
      {},
      point,
      {
        isOffers: point.offers !== null,
        isDescription: point.destination.description !== null,
        isPicture: point.destination.pictures !== null,
      },
    );
  }

  static parseDataToPoint(data) {
    data = Object.assign({}, data);

    if (!data.isOffers) {
      data.offers = null;
    }

    if (!data.isDescription) {
      data.destination.description = null;
    }

    if (!data.isPicture) {
      data.destination.pictures = null;
    }

    delete data.isOffers;
    delete data.isDescription;
    delete data.isPicture;

    return data;
  }
}
