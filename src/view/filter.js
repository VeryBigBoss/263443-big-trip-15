import AbstractView from './abstract.js';

const createFilterItemTemplate = (filter, currentFilterType, isDisabled) => {
  const {type, name} = filter;
  return `<div class="trip-filters__filter">
        <input id="filter-${name}"
               class="trip-filters__filter-input  visually-hidden"
               type="radio"
               name="trip-filter"
               value="${name}"
               ${type === currentFilterType ? 'checked' : ''}
               ${isDisabled ? 'disabled' : ''}>
        <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
   </div>`;
};

const creatFilterTemplate = (filterItems, currentFilterType, isDisabled) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter, currentFilterType, isDisabled))
    .join('');

  return `<div class="trip-controls__filters">
    <h2 class="visually-hidden">Filter events</h2>
    <form class="trip-filters" action="#" method="get">
        ${filterItemsTemplate}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
  </div>`;
};

export default class Filter extends AbstractView {
  constructor(filterItems, currentFilterType, isDisabled) {
    super();
    this._filterItems = filterItems;
    this._currentFilter = currentFilterType;
    this._isDisabled = isDisabled;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return creatFilterTemplate(this._filterItems, this._currentFilter, this._isDisabled);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener('change', this._filterTypeChangeHandler);
  }
}
