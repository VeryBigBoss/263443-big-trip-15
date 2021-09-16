import SortView from '../view/sort';
import PointListView from '../view/point-list';
import EmptyView from '../view/empty';
import {render, RenderPosition, remove} from '../utils/render';
import LoadingView from '../view/loading.js';
import PointPresenter from '../presenter/point';
import PointNewPresenter from './point-new.js';
import {SortType, UpdateType, UserAction, FilterType} from '../const';
import {sortPointByDayAsc, sortPointByPriceDesc, sortPointByTime} from '../utils/point';
import {filter} from '../utils/filter.js';

export default class Trip {
  constructor(tripContainer, pointsModel, filterModel, api) {
    this._tripContainer = tripContainer;
    this._pointsModel = pointsModel;
    this._filterModel = filterModel;
    this._pointPresenter = new Map();
    this._filterType = FilterType.EVERYTHING;

    this._sortComponent = null;
    this._emptyPointComponent = null;

    this._pointListComponent = new PointListView();
    // this._sortComponent = new SortView();
    // this._emptyComponent = new EmptyView();
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

    this._renderTrip();
  }

  destroy() {
    this._clearTrip({/*resetRenderedTaskCount: true, */resetSortType: true});

    remove(this._pointListComponent);
    // remove(this._tripContainer);

    this._pointsModel.removeObserver(this._handleModelEvent);
    this._filterModel.removeObserver(this._handleModelEvent);
  }

  createPoint(callback) {
    this._pointNewPresenter = new PointNewPresenter(this._pointListComponent, this._handleViewAction);
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
    // debugger;
    if (this._currentSortType === sortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearTrip({/*resetRenderedTaskCount: true*/});
    this._renderTrip();
  }

  _handleModeChange() {
    this._pointNewPresenter.destroy();
    this._pointPresenter.forEach((presenter) => presenter.resetView());
  }

  _handleViewAction(actionType, updateType, update) {
    // console.log(actionType, updateType, update);
    // Здесь будем вызывать обновление модели.
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    // update - обновленные данные
    switch (actionType) {
      case UserAction.UPDATE_POINT:
        // this._pointsModel.updatePoint(updateType, update);
        this._api.updatePoint(update).then((response) => {
          this._pointsModel.updatePoint(updateType, response);
        });
        break;
      case UserAction.ADD_POINT:
        // this._pointsModel.addPoint(updateType, update);
        this._api.addPoint(update).then((response) => {
          this._pointsModel.addPoint(updateType, response);
        });
        break;
      case UserAction.DELETE_POINT:
        this._api.deletePoint(update).then(() => {
          // Обратите внимание, метод удаления задачи на сервере
          // ничего не возвращает. Это и верно,
          // ведь что можно вернуть при удалении задачи?
          // Поэтому в модель мы всё также передаем update
          this._pointsModel.deletePoint(updateType, update);
        });
    }
  }

  _handleModelEvent(updateType, data) {
    // console.log(updateType, data);
    // В зависимости от типа изменений решаем, что делать:
    // - обновить часть списка (например, когда поменялось описание)
    // - обновить список (например, когда задача ушла в архив)
    // - обновить всю доску (например, при переключении фильтра)
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например, когда поменялось описание)
        this._pointPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        // - обновить список (например, когда задача ушла в архив)
        this._clearTrip();
        this._renderTrip();
        break;
      case UpdateType.MAJOR:
        // - обновить всю доску (например, при переключении фильтра)
        this._clearTrip({/*resetRenderedTaskCount: true, */resetSortType: true});
        this._renderTrip();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
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
    const pointPresenter = new PointPresenter(this._pointListComponent, this._handleViewAction, this._handleModeChange);
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

  _renderLoadMoreButton() {
  }

  _clearTrip({/*resetRenderedPointCount = false, */resetSortType = false} = {}) {
    // const taskCount = this._getTasks().length;

    this._pointNewPresenter.destroy();
    this._pointPresenter.forEach((presenter) => presenter.destroy());
    this._pointPresenter.clear();

    remove(this._sortComponent);
    remove(this._loadingComponent);
    // remove(this._loadMoreButtonComponent);

    // if (resetRenderedTaskCount) {
    //   this._renderedTaskCount = TASK_COUNT_PER_STEP;
    // } else {
    //   // На случай, если перерисовка доски вызвана
    //   // уменьшением количества задач (например, удаление или перенос в архив)
    //   // нужно скорректировать число показанных задач
    //   this._renderedTaskCount = Math.min(taskCount, this._renderedTaskCount);
    // }

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
