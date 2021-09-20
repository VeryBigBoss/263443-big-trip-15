export const POINT_TYPES = [
  'taxi',
  'bus',
  'train',
  'ship',
  'drive',
  'flight',
  'check-in',
  'sightseeing',
  'restaurant',
];

export const FilterType = {
  EVERYTHING: 'everything',
  FUTURE: 'future',
  PAST: 'past',
};

export const SortType = {
  DAY: {
    value: 'day',
    isDisabled: false,
  },
  EVENT: {
    value: 'event',
    isDisabled: true,
  },
  TIME: {
    value: 'time',
    isDisabled: false,
  },
  PRICE: {
    value: 'price',
    isDisabled: false,
  },
  OFFERS: {
    value: 'offers',
    isDisabled: true,
  },
};

export const UserAction = {
  UPDATE_POINT: 'UPDATE_POINT',
  ADD_POINT: 'ADD_POINT',
  DELETE_POINT: 'DELETE_POINT',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};

export const MenuItem = {
  ADD_NEW_POINT: 'ADD_NEW_POINT',
  TABLE: 'TABLE',
  STATS: 'STATS',
};

export const ChartTypes = {
  MONEY: 'MONEY',
  TYPE: 'TYPE',
  TIME_SPEND: 'TIME-SPEND',
};
