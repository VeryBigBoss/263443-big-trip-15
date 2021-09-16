import AbstractObserver from '../utils/abstract-observer.js';

export default class Points extends AbstractObserver {
  constructor() {
    super();
    this._points = [];
  }

  setPoints(updateType, points) {
    this._points = points.slice();
    this._notify(updateType);
  }

  getPoints() {
    return this._points;
  }

  updatePoint(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this._points = [
      ...this._points.slice(0, index),
      update,
      ...this._points.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  addPoint(updateType, update) {
    this._points = [
      update,
      ...this._points,
    ];

    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this._points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this._points = [
      ...this._points.slice(0, index),
      ...this._points.slice(index + 1),
    ];

    this._notify(updateType);
  }

  static adaptToClient(point) {
    const adaptedPoint = Object.assign(
      {},
      point,
      {
        cost: point[base_price],
        dateTimeBegin: new Date(point[date_to]),
        dateTimeEnd: new Date(point[date_from]),
        isFavorite: point['is_favorite'],
      },
    );

    // Ненужные ключи мы удаляем
    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
  }

  static adaptToServer(point) {
    const adaptedPoint = Object.assign(
      {},
      point,
      {
        'base_price': point.cost, // На сервере дата хранится в ISO формате
        'date_to': point.dateTimeBegin instanceof Date ? point.dateTimeBegin.toISOString() : null,
        'date_from': point.dateTimeEnd instanceof Date ? point.dateTimeEnd.toISOString() : null,
        'is_favorite': point.isFavorite,
      },
    );

    // Ненужные ключи мы удаляем
    delete adaptedPoint.cost;
    delete adaptedPoint.dateTimeBegin;
    delete adaptedPoint.dateTimeEnd;
    delete adaptedPoint.isFavorite;

    return adaptedPoint;
  }
}
