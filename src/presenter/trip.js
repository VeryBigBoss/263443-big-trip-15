import SortView from '../view/sort';
import PointListView from '../view/point-list';
import EmptyView from '../view/empty';
import {render, RenderPosition, remove} from '../utils/render';
import LoadingView from '../view/loading.js';
import PointPresenter, {State as PointPresenterViewState} from '../presenter/point';
import PointNewPresenter from './point-new.js';
import {SortType, UpdateType, UserAction, FilterType} from '../const';
import {sortPointByDayAsc, sortPointByPriceDesc, sortPointByTime} from '../utils/point';
import {filter} from '../utils/filter.js';

export default class Trip {
  constructor(tripContainer, pointsModel, offersModel, destinationsModel, filterModel, api) {
    this._tripContainer = tripContainer;
    this._pointsModel = pointsModel;
    this._filterModel = filterModel;
    this._offersModel = offersModel;
    this._destinationsModel = destinationsModel;
    this._pointPresenter = new Map();
    this._filterType = FilterType.EVERYTHING;

    this._sortComponent = null;
    this._emptyPointComponent = null;

    this._pointListComponent = new PointListView();
    this._currentSortType = SortType.DAY.value;
    this._isLoading = true;
    this._api = api;

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._pointNewPresenter = new PointNewPresenter(this._pointListComponent, this._handleViewAction);
    this._loadingComponent = new LoadingView();
  }

  init() {
    render(this._tripContainer, this._pointListComponent, RenderPosition.BEFOREEND);

    this._pointsModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
    this._offersModel.addObserver(this._handleModelEvent);
    this._destinationsModel.addObserver(this._handleModelEvent);

    this._renderTrip();
  }

  destroy() {
    this._clearTrip({resetSortType: true});

    remove(this._pointListComponent);

    this._pointsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
    this._offersModel.removeObserver(this._handleModelEvent);
    this._destinationsModel.removeObserver(this._handleModelEvent);
  }

  createPoint(callback) {
    this._pointNewPresenter = new PointNewPresenter(this._pointListComponent, this._handleViewAction, this._offersModel, this._destinationsModel);
    this._pointNewPresenter.init(callback);
  }

  _getPoints() {
    this._filterType = this._filterModel.getFilter();
    const points = this._pointsModel.getPoints();
    const filteredPoints = filter[this._filterType](points);

    switch (this._currentSortType) {
      case SortType.DAY.value:
        return filteredPoints.sort(sortPointByDayAsc);
      case SortType.TIME.value:
        return filteredPoints.sort(sortPointByTime);
      case SortType.PRICE.value:
        return filteredPoints.sort(sortPointByPriceDesc);
    }

    return filteredPoints;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearTrip({});
    this._renderTrip();
  }

  _handleModeChange() {
    this._pointNewPresenter.destroy();
    this._pointPresenter.forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        this._pointPresenter.get(update.id).setViewState(PointPresenterViewState.SAVING);
        this._api.updatePoint(update)
          .then((response) => {
            this._pointsModel.updatePoint(updateType, response);
          })
          .catch(() => {
            this._pointPresenter.get(update.id).setViewState(PointPresenterViewState.ABORTING);
          });
        break;
      case UserAction.ADD_POINT:
        this._pointNewPresenter.setSaving();
        this._api.addPoint(update)
          .then((response) => {
            this._pointsModel.addPoint(updateType, response);
          })
          .catch(() => {
            this._pointNewPresenter.setAborting();
          });
        break;
      case UserAction.DELETE_POINT:
        this._pointPresenter.get(update.id).setViewState(PointPresenterViewState.DELETING);
        this._api.deletePoint(update)
          .then(() => {
            this._pointsModel.deletePoint(updateType, update);
          })
          .catch(() => {
            this._pointPresenter.get(update.id).setViewState(PointPresenterViewState.ABORTING);
          });
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this._clearTrip();
        this._renderTrip();
        break;
      case UpdateType.MAJOR:
        this._clearTrip({resetSortType: true});
        this._renderTrip();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._clearTrip();
        this._renderTrip();
        break;
    }
  }

  _renderSort() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }
    this._sortComponent = new SortView(this._currentSortType);

    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    render(this._tripContainer, this._sortComponent, RenderPosition.AFTERBEGIN);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._pointListComponent, this._handleViewAction, this._handleModeChange, this._offersModel, this._destinationsModel);
    pointPresenter.init(point);
    this._pointPresenter.set(point.id, pointPresenter);
  }

  _renderPoints(points) {
    points.forEach((point) => this._renderPoint(point));
  }

  _renderNoPoints() {
    this._emptyPointComponent = new EmptyView(this._filterType);
    render(this._pointListComponent, this._emptyPointComponent, RenderPosition.BEFOREEND);
  }

  _renderLoading() {
    render(this._pointListComponent, this._loadingComponent, RenderPosition.AFTERBEGIN);
  }

  _clearTrip({resetSortType = false} = {}) {
    this._pointNewPresenter.destroy();
    this._pointPresenter.forEach((presenter) => presenter.destroy());
    this._pointPresenter.clear();

    remove(this._sortComponent);
    remove(this._loadingComponent);

    if (this._emptyPointComponent) {
      remove(this._emptyPointComponent);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DAY.value;
    }
  }

  _renderTrip() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    if (this._getPoints().length === 0) {
      this._renderNoPoints();
      return;
    }

    this._renderSort();
    this._renderPoints(this._getPoints());
  }
}
