import dayjs from 'dayjs';
import { ChartTypes } from '../const';
import {humanizeDuration} from './point';

const filterPointsByType = (points, type) => points.filter((point) => point.type.toUpperCase() === type.toUpperCase());
export const countPrice = (points) => points.reduce((price, point) => price + point.cost, 0);
export const countQuantity = (points) => points.length;
export const countDuration = (points) => points.reduce((duration, point) => duration + dayjs(point.dateTimeEnd).diff(dayjs(point.dateTimeBegin), 'minute'), 0);
export const getUniquePointTypes = (points) => [...new Set(points.map((point) => point.type.toUpperCase()))];

export const getTotalsByType = (points, callback) => {
  const types = getUniquePointTypes(points);
  const totals = new Map();

  types.forEach((type) => {
    const filteredPoints = filterPointsByType(points, type);
    totals.set(type, callback(filteredPoints));
  });

  return totals;
};

export const getFormatter = (val, type) => {
  switch (type) {
    case ChartTypes.MONEY:
      return `€ ${val}`;
    case ChartTypes.TYPE:
      return `${val}x`;
    case ChartTypes.TIME_SPEND:
      return `${humanizeDuration(val)}`;
  }
};
