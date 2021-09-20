import AbstractView from './abstract.js';
import {SortType} from '../const';

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
    return createSortFormTemplate(this._currentSortType);
  }

  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== 'INPUT') {
      return;
    }
    this._removeInputChecked();
    evt.target.setAttribute('checked', 'true');
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  _removeInputChecked() {
    const inputs = this._element.querySelectorAll('input');
    for (const input of inputs) {
      input.removeAttribute('checked');
    }
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener('click', this._sortTypeChangeHandler);
  }
}
