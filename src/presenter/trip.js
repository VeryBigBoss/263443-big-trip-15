import SortView from '../view/sort';
import PointListView from '../view/point-list';
import EmptyView from '../view/empty';
import {render, RenderPosition} from '../utils/render';
import PointPresenter from '../presenter/point';
import {updateItem} from '../utils/common';
import {SortType} from '../const';
import {sortPointByDayAsc, sortPointByPriceDesc, sortPointByTime} from '../utils/point';

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;
    this._pointPresenter = new Map();

    this._pointListComponent = new PointListView();
    this._sortComponent = new SortView();
    this._emptyComponent = new EmptyView();
    this._currentSortType = SortType.DAY.value;

    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(points) {
    this._points = points.slice();
    this._sourcedPoints = points.slice();
    this._sortPoints(this._currentSortType);
    render(this._tripContainer, this._pointListComponent, RenderPosition.BEFOREEND);
    this._renderTrip();
  }

  _handleSortTypeChange(sortType) {
    // debugger;
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortPoints(sortType);
    this._clearPointList();
    this._renderPoints();
  }

  _handleModeChange() {
    this._pointPresenter.forEach((presenter) => presenter.resetView());
  }

  _handlePointChange(updatedPoint) {
    this._points = updateItem(this._points, updatedPoint);
    this._sourcedPoints = updateItem(this._sourcedPoints, updatedPoint);
    this._pointPresenter.get(updatedPoint.id);//.init(updatedPoint);
  }

  _sortPoints(sortType) {
    switch (sortType) {
      case SortType.DAY.value:
        this._points.sort(sortPointByDayAsc);
        break;
      case SortType.TIME.value:
        this._points.sort(sortPointByTime);
        break;
      case SortType.PRICE.value:
        this._points.sort(sortPointByPriceDesc);
        break;
      // default:
        // this._points = this._sourcedPoints.slice();
    }

    this._currentSortType = sortType;
  }

  _renderSort() {
    render(this._pointListComponent, this._sortComponent, RenderPosition.BEFOREEND);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._pointListComponent, this._handlePointChange, this._handleModeChange);
    pointPresenter.init(point);
    this._pointPresenter.set(point.id, pointPresenter);
  }

  _renderPoints() {
    this._points.forEach((point) => this._renderPoint(point));
  }

  _renderNoPoints() {
    render(this._pointListComponent, this._emptyComponent, RenderPosition.BEFOREEND);
  }

  _clearPointList() {
    this._pointPresenter.forEach((presenter) => presenter.destroy());
    this._pointPresenter.clear();
  }

  _renderLoadMoreButton() {
  }

  _renderTrip() {
    if (this._points.length === 0) {
      this._renderNoPoints();
      return;
    }

    this._renderSort();
    this._renderPoints();
  }
}
