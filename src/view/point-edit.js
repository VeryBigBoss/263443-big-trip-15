import SmartView from '../view/smart.js';
import {humanizeDate, humanizeValue, isDateValidate} from '../utils/point';
import {POINT_TYPES} from '../const';
import flatpickr from 'flatpickr';

import '../../node_modules/flatpickr/dist/flatpickr.min.css';
import {isPositiveInteger} from '../utils/common';

const EMPTY_POINT = {
  // id: nanoid(),
  type: null,
  city: null,
  dateTimeBegin: null,
  dateTimeEnd: null,
  cost: null,
  offers: null,
  destination: {
    description: null,
    name: null,
    pictures: null,
  },
  isFavorite: false,
};

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

const createAvailableOffersTemplate = (selectedOffers, availableOffers, isAvailableOffers) => isAvailableOffers ? `<section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>
            <div class="event__available-offers">
        ${availableOffers.map((availableOffer) =>
    `<div class="event__offer-selector">
            <input class="event__offer-checkbox  visually-hidden" id="${availableOffer.title}${availableOffer.price}" type="checkbox"
                   name="event-offer-${availableOffer.title}"
                   data-offer-title="${availableOffer.title}"
                   data-offer-price="${availableOffer.price}"
                   ${selectedOffers.filter((item) => item.title === availableOffer.title).length > 0 ? 'checked' : ''}>
            <label class="event__offer-label" for="${availableOffer.title}${availableOffer.price}">
              <span class="event__offer-title">${availableOffer.title}</span>
              &plus;&euro;&nbsp;
              <span class="event__offer-price">${availableOffer.price}</span>
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

const createDetailsTemplate = (availableOffers, selectedOffers, destination, isAvailableOffers, isDescription, isPicture) => (isAvailableOffers || (isDescription || isPicture)) ? `<section class="event__details">
    ${createAvailableOffersTemplate(selectedOffers, availableOffers, isAvailableOffers)}
    ${createDestinationSectionTemplate(destination, isDescription, isPicture)}
    </section>` : '';

const createPointEditForm = (data, availableOffers, availableDestinations) => {
  const {type, city, cost, dateTimeBegin, dateTimeEnd, destination, isDescription, isPicture} = data;
  const selectedOffers = data.offers;
  const availableCities = availableDestinations.map((item) => item.name);
  const isAvailableOffers = availableOffers.length > 0;
  const isNew = city === null && cost === null;
  return `<form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" ${type ? `src="img/icons/${type}.png"` : ''} alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
        ${createPointTypeListTemplate()}
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${humanizeValue(type)}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text"
               name="event-destination" value="${humanizeValue(destination.name)}" list="destination-list-1">
        <datalist id="destination-list-1">
            ${createCityListTemplate(availableCities)}
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
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${humanizeValue(cost)}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">${isNew ? 'Cancel' : 'Delete'}</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
<!--    {createDetailsTemplate(offers, destination, isOffers, isDescription, isPicture)}-->
    ${createDetailsTemplate(availableOffers, selectedOffers, destination, isAvailableOffers, isDescription, isPicture)}
  </form>`;
};

export default class PointEdit extends SmartView {
  constructor(point = EMPTY_POINT, offers, destinations) {
    super();
    this._data = PointEdit.parsePointToData(point);
    this._availableOffers = this._getAvailableOffers(offers, this._data);
    this._destinations = destinations;
    this._datepicker = null;
    this._datepickerEnd = null;
    this._pointTypeChangeHandler = this._pointTypeChangeHandler.bind(this);
    this._cityChangeHandler = this._cityChangeHandler.bind(this);
    this._dateTimeBeginChangeHandler = this._dateTimeBeginChangeHandler.bind(this);
    this._dateTimeEndChangeHandler = this._dateTimeEndChangeHandler.bind(this);
    this._costChangeHandler = this._costChangeHandler.bind(this);
    this._offersChangeHandler = this._offersChangeHandler.bind(this);
    this._formDeleteClickHandler = this._formDeleteClickHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._formRollupHandler = this._formRollupHandler.bind(this);

    this._setInnerHandlers();
    this._setDatepicker();
    this._setDatepickerEnd();
  }

  getTemplate() {
    return createPointEditForm(this._data, this._availableOffers, this._destinations);
  }

  // Перегружаем метод родителя removeElement,
  // чтобы при удалении удалялся более ненужный календарь
  removeElement() {
    super.removeElement();

    if (this._datepicker) {
      this._datepicker.destroy();
      this._datepicker = null;
    }
  }

  reset(point) {
    this.updateData(
      PointEdit.parsePointToData(point),
    );
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setDatepicker();
    this._setDatepickerEnd();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setFormRollupHandler(this._callback.formRollup);
    this.setDeleteClickHandler(this._callback.deleteClick);
  }

  _setDatepicker() {
    if (this._datepicker) {
      this._datepicker.destroy();
      this._datepicker = null;
    }

    this._datepicker = flatpickr(
      this.getElement().querySelector('.event__input--time'),
      {
        enableTime: true,
        dateFormat: 'd/m/Y H:i',
        defaultDate: this._data.dateTimeBegin,
        onChange: this._dateTimeBeginChangeHandler,
      },
    );
  }

  _setDatepickerEnd() {
    if (this._datepickerEnd) {
      this._datepickerEnd.destroy();
      this._datepickerEnd = null;
    }

    this._datepickerEnd = flatpickr(
      this.getElement().querySelectorAll('.event__input--time')[1],
      {
        enableTime: true,
        dateFormat: 'd/m/Y H:i',
        // minDate: this._data.dateTimeBegin,
        defaultDate: this._data.dateTimeEnd,
        onChange: this._dateTimeEndChangeHandler,
      },
    );
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector('.event__type-group')
      .addEventListener('change', this._pointTypeChangeHandler);
    // this.getElement()
    //   .querySelector('.event__available-offers')
    //   .addEventListener('change', () => this._offersChangeHandler);
    this.getElement()
      .querySelector('.event__input--destination')
      .addEventListener('change', this._cityChangeHandler);
    this.getElement()
      .querySelector('.event__input--price')
      .addEventListener('change', this._costChangeHandler);

    const offerElements = this.getElement().querySelectorAll('.event__offer-checkbox');
    if (offerElements.length > 0) {
      offerElements.forEach((elem) => elem.addEventListener('click', this._offersChangeHandler));
    }
  }

  _pointTypeChangeHandler(evt) {
    evt.preventDefault();
    const offersTarget = this._availableOffers.get(evt.target.value.toLowerCase());
    this.updateData({
      type: evt.target.value,
      offers: offersTarget !== undefined ? offersTarget : null,
      isOffers: offersTarget !== undefined,
    }, false);
  }

  _validateCity(city) {
    return Array.from(this._destinations.map((item) => item.name === city));
  }

  _cityChangeHandler(evt) {
    evt.preventDefault();

    let validity = '';
    if (this._validateCity(evt.target.value).length === 0) {
      validity = 'Место назначения может быть выбрано только из списка';
    }
    evt.target.setCustomValidity(validity);
    evt.target.reportValidity();
    if (!evt.target.validity.valid) {
      return;
    }

    const result = this._destinations.find((dest) => dest.name === evt.target.value);
    if (result !== undefined) {
      this.updateData({
        city: evt.target.value,
        destination: result,
        isDescription: result.description !== undefined,
        isPicture: result.pictures && result.pictures.length > 0,
      }, false);
    }
    else {
      this.updateData({
        city: evt.target.value,
        destination: null,
        isDescription: false,
        isPicture: false,
      }, false);
    }
  }

  _dateTimeBeginChangeHandler([userDate]) {
    // evt.preventDefault();
    this.updateData({
      dateTimeBegin: userDate,
    }, true);
  }

  _dateTimeEndChangeHandler([userDate]) {
    // evt.preventDefault();
    this.updateData({
      dateTimeEnd: userDate,
    }, true);
  }

  _costChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({
      cost: evt.target.value,
    }, true);
  }

  _validateCost(cost) {
    return isPositiveInteger(Number(cost));
  }

  _validateDate(dateBegin, dateEnd) {
    return isDateValidate(dateBegin, dateEnd);
  }

  _offersChangeHandler(evt) {
    evt.target.toggleAttribute('checked');
    const offerElements = Array.from(this.getElement().querySelectorAll('.event__offer-checkbox:checked'));
    // let object;
    const selectedOffers = Array.from(offerElements.map((elem) =>  elem = {'title': elem.dataset.offerTitle, 'price': elem.dataset.offerPrice}));
    this.updateData({
      offers: selectedOffers,
    }, true);
  }

  _validateForm(data) {
    const cityError = this._validateCity(data.city) ? '' : 'Город может быть выбран только из текущего списка\n';
    const costError = this._validateCost(data.cost) ? '' : 'Стоимость может быть только целым неотрицательным числом\n';
    const dateError = this._validateDate(data.dateTimeBegin, data.dateTimeEnd) ? '' : 'Проверьте правильность ввода дат\n';
    return cityError + dateError + costError;
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    const error = this._validateForm(this._data);
    if (error !== '') {
      // eslint-disable-next-line no-alert
      alert(error);
      return;
    }
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

  _formDeleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.deleteClick(PointEdit.parseDataToPoint(this._data));
  }

  setDeleteClickHandler(callback) {
    this._callback.deleteClick = callback;
    this.getElement().querySelector('.event__reset-btn').addEventListener('click', this._formDeleteClickHandler);
  }

  _getAvailableOffers(offers, point) {
    if (point.type !== null && offers.size > 0) {
      return offers.get(point.type);
    } else {
      return offers;
    }
  }

  static parsePointToData(point) {
    if (!point) {
      point = EMPTY_POINT;
    }
    return Object.assign(
      {},
      point,
      {
        isOffers: point.offers !== null,
        isDescription: point.destination && point.destination.description !== null,
        isPicture: point.destination && point.destination.pictures !== null,
      },
    );
  }

  static parseDataToPoint(data) {
    data = Object.assign({}, data);

    if (!data.isOffers) {
      data.offers = null;
    }

    if (!data.isDescription && data.destination) {
      data.destination.description = null;
    }

    if (!data.isPicture && data.destination) {
      data.destination.pictures = null;
    }

    delete data.isOffers;
    delete data.isDescription;
    delete data.isPicture;

    return data;
  }
}
