import {createElement} from '../utils';

const createFilterItemTemplate = (name) =>
  // const {name} = filter;
  `<input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter"
               value="${name}" >
        <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>`;
const creatFilterTemplate = (filterItems) => {
  const filterItemsTemplate = filterItems
    .map((filter) => createFilterItemTemplate(filter))
    .join('');

  return `<div class="trip-controls__filters">
    <h2 class="visually-hidden">Filter events</h2>
    <form class="trip-filters" action="#" method="get">
      <div class="trip-filters__filter">
        ${filterItemsTemplate}
      </div>
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>
  </div>`;
};

export default class Filter {
  constructor(filterItems) {
    this._filterItems = filterItems;
    this._element = null;
  }

  getTemplate() {
    return creatFilterTemplate(this._filterItems);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
