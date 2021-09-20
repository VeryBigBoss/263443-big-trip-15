import {FilterType} from '../const';
import {isEverything, isFuture, isPast} from './point';

export const filter = {
  [FilterType.EVERYTHING]: (points) => points.filter((point) => isEverything(point.dateTimeBegin)),
  [FilterType.FUTURE]: (points) => points.filter((point) => isFuture(point.dateTimeBegin, point.dateTimeEnd)),
  [FilterType.PAST]: (points) => points.filter((point) => isPast(point.dateTimeEnd)),
};
