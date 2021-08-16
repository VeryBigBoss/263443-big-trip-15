import SortView from '../view/sort';
import PointListView from '../view/point-list';
import EmptyView from '../view/empty';
import {render, RenderPosition} from '../utils/render';
import PointPresenter from '../presenter/point';
import {updateItem} from '../utils/common';

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;
    this._pointPresenter = new Map();

    this._pointListComponent = new PointListView();
    this._sortComponent = new SortView();
    this._emptyComponent = new EmptyView();

    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
  }

  init(points) {
    this._points = points.slice();
    render(this._tripContainer, this._pointListComponent, RenderPosition.BEFOREEND);
    this._renderTrip();
  }

  _handleModeChange() {
    this._pointPresenter.forEach((presenter) => presenter.resetView());
  }

  _handlePointChange(updatedPoint) {
    this._points = updateItem(this._points, updatedPoint);
    // debugger;
    this._pointPresenter.get(updatedPoint.id);//.init(updatedPoint);
  }

  _renderSort() {
    render(this._pointListComponent, this._sortComponent, RenderPosition.BEFOREEND);
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
