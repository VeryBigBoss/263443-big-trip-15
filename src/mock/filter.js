import {filters} from '../const.js';

// import {isFuture, isPast, getRandomInteger} from '../utils';
//
// const eventToFilterMap = {
//   past: (events) = events.filter((event) => isPast(event.dateTimeBegin)).length,
//   future: (events) = events.filter((event) => isFuture(event.dateTimeBegin)).let,
//   everything: events.length,
// };
//
//
// export const generateFilter = (events) => Object.entries(eventToFilterMap).map(
//   ([filterName, count]) => ({
//     name: filterName,
//     count: count,
//   }),
// );

export const generateFilter = () => filters;
