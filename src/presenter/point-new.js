import PointEditView from '../view/point-edit';
import {remove, render, RenderPosition} from '../utils/render';
import {UserAction, UpdateType} from '../const.js';
import {isEscKey} from '../utils/common';

export default class PointNew {
  constructor(pointListContainer, changeData, offersModel, destinationModel) {
    this._pointListContainer = pointListContainer;
    this._changeData = changeData;
    this._offersModel = offersModel;
    this._destinationModel = destinationModel;

    this._pointEditComponent = null;
    this._destroyCallback = null;

    this._handleDeleteClick = this._handleDeleteClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleFormRollup = this._handleFormRollup.bind(this);
    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
  }

  init(callback) {
    this._destroyCallback = callback;

    if (this._pointEditComponent !== null) {
      return;
    }

    const offers = this._offersModel.getOffers();
    const destinations = this._destinationModel.getDestinations();
    this._pointEditComponent = new PointEditView(null, offers, destinations);

    this._pointEditComponent.setDeleteClickHandler(this._handleDeleteClick);
    this._pointEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._pointEditComponent.setFormRollupHandler(this._handleFormRollup);

    render(this._pointListContainer, this._pointEditComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this._escKeyDownHandler);
  }

  destroy() {
    if (this._pointEditComponent === null) {
      return;
    }

    if (this._destroyCallback !== null) {
      this._destroyCallback();
    }

    remove(this._pointEditComponent);
    this._pointEditComponent = null;

    document.removeEventListener('keydown', this._escKeyDownHandler);
  }

  setSaving() {
    this._pointEditComponent.updateData({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting() {
    const resetFormState = () => {
      this._pointEditComponent.updateData({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this._pointEditComponent.shake(resetFormState);
  }

  _escKeyDownHandler(evt) {
    if (isEscKey(evt)) {
      evt.preventDefault();
      this.destroy();
    }
  }

  _handleFormSubmit(point) {
    this._changeData(
      UserAction.ADD_POINT,
      UpdateType.MAJOR,
      point,
    );
  }

  _handleFormRollup() {
    this.destroy();
  }

  _handleDeleteClick() {
    this.destroy();
  }

}
