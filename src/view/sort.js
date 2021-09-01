import AbstractView from './abstract.js';
import {SortType} from '../const';

// const createSort = () => (
//   `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
//     <div class="trip-sort__item  trip-sort__item--day">
//       <input id="sort-day" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-day">
//       <label class="trip-sort__btn" for="sort-day">Day</label>
//     </div>
//
//     <div class="trip-sort__item  trip-sort__item--event">
//       <input id="sort-event" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-event"
//              disabled>
//       <label class="trip-sort__btn" for="sort-event">Event</label>
//     </div>
//
//     <div class="trip-sort__item  trip-sort__item--time">
//       <input id="sort-time" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-time">
//       <label class="trip-sort__btn" for="sort-time">Time</label>
//     </div>
//
//     <div class="trip-sort__item  trip-sort__item--price">
//       <input id="sort-price" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-price"
//              checked>
//       <label class="trip-sort__btn" for="sort-price">Price</label>
//     </div>
//
//     <div class="trip-sort__item  trip-sort__item--offer">
//       <input id="sort-offer" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-offer"
//              disabled>
//       <label class="trip-sort__btn" for="sort-offer">Offers</label>
//     </div>
//   </form>`
// );

const createSortFormTemplate = (currentSortType) => {
  const sortTypeItems = Object.keys(SortType);
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
            ${sortTypeItems.map((sortTypeItem) =>
    `<div class="trip-sort__item  trip-sort__item--${SortType[sortTypeItem].value}">
               <input id="sort-${SortType[sortTypeItem].value}"
                class="trip-sort__input  visually-hidden"
                type="radio"
                name="trip-sort"
                value="sort-${SortType[sortTypeItem].value}"
                ${SortType[sortTypeItem].isDisabled === true ? 'disabled' : ''}
                ${currentSortType === SortType[sortTypeItem].value ? 'checked' : ''}
                data-sort-type="${SortType[sortTypeItem].value}"
                >
               <label class="trip-sort__btn" for="sort-${SortType[sortTypeItem].value}">${SortType[sortTypeItem].value}</label>
             </div>`).join('')}
         </form>`;
};

export default class Sort extends AbstractView {
  constructor(currentSortType = SortType.DAY.value) {
    super();
    this._currentSortType = currentSortType;
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    // return createSort();
    return createSortFormTemplate(this._currentSortType);
  }

  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    // debugger;
    this.getElement().addEventListener('click', this._sortTypeChangeHandler);
  }
}
