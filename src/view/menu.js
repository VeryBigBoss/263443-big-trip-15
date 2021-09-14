import AbstractView from './abstract.js';
import {MenuItem} from '../const.js';
import {capitalize} from '../utils/common';

const ACTIVE_MENU_CLASSNAME = 'trip-tabs__btn--active';

const createMenuTemplate = (isDisabled, activeMenu) => (
  `<nav class="trip-controls__trip-tabs  trip-tabs">
    <a class="trip-tabs__btn  ${!isDisabled && activeMenu === MenuItem.TABLE ? ACTIVE_MENU_CLASSNAME : ''}"
        data-menu-item="${MenuItem.TABLE}"
        href="#">${capitalize(MenuItem.TABLE)}</a>
    <a class="trip-tabs__btn ${!isDisabled && activeMenu === MenuItem.STATS ? ACTIVE_MENU_CLASSNAME : ''}"
        data-menu-item="${MenuItem.STATS}"
        href="#">${capitalize(MenuItem.STATS)}</a>
  </nav>`
);

export default class Menu extends AbstractView {
  constructor(isDisabled) {
    super();

    this._activeMenu = MenuItem.TABLE;
    this._isDisabled = isDisabled;

    this._menuClickHandler = this._menuClickHandler.bind(this);
  }

  getTemplate() {
    return createMenuTemplate(this._isDisabled, this._activeMenu);
  }

  _menuClickHandler(evt) {
    evt.preventDefault();
    if (evt.target.tagName !== 'A') {
      return;
    }

    if (evt.target.classList.contains(ACTIVE_MENU_CLASSNAME)) {
      return;
    }

    this._callback.menuClick(evt.target.dataset.menuItem);
  }

  setMenuClickHandler(callback) {
    this._callback.menuClick = callback;
    this.getElement().addEventListener('click', this._menuClickHandler);
  }

  setMenuItem(menuItem) {
    this._activeMenu = menuItem;
    const items = this.getElement().querySelectorAll('A');
    items.forEach((item) => item.dataset.menuItem === menuItem
      ? (item.classList.add(ACTIVE_MENU_CLASSNAME) && (item.disable = true))
      : (item.classList.remove(ACTIVE_MENU_CLASSNAME) && (item.disable = false)));
  }
}
