import dayjs from 'dayjs';

export const calculateDuration = (dateBegin, dateEnd) => dayjs(dateEnd).diff(dayjs(dateBegin), 'minute');

export const humanizeMinuteAndHours = (date) => dayjs(date).format('HH:mm');
export const humanizeDay = (date) => dayjs(date).format('MMM D');
export const humanizeDate = (date) => date !== null ? dayjs(date).format('DD/MM/YY HH:mm') : '';

export const humanizeValue = (value) => value === null || value === undefined ? '' : value;

const numberFormat = (number) => {
  if (number > 0 && number < 10) {
    return `0${number}`;
  } else if (number === 0) {
    return '00';
  }
  return number;
};

export const humanizeDuration = (duration) => {
  const days = Math.floor(duration / (60 * 24));
  const hours = Math.floor((duration % (60 * 24)) / 60);
  const minute = Math.floor(duration % 60);
  return `${(days > 0 ? `${numberFormat(days)}D ` : '') + (days > 0 ? `${numberFormat(hours)}H ` : '')  }${numberFormat(minute)}M`;
};

export const isEverything = (date) => date !== null;
export const isFuture = (date) => dayjs(date).isAfter(dayjs(), 'day') || dayjs(date).isSame(dayjs(), 'day');
export const isPast = (date) => dayjs(date).isBefore(dayjs(), 'day');

export const sortPointByDayAsc = (pointA, pointB) => dayjs(pointA.dateTimeBegin).diff(dayjs(pointB.dateTimeBegin));
export const sortPointByTime = (pointA, pointB) => dayjs(pointB.dateTimeEnd).diff(pointB.dateTimeBegin, 'millisecond') - dayjs(pointA.dateTimeEnd).diff(pointA.dateTimeBegin, 'millisecond');
export const sortPointByPriceDesc = (pointA, pointB) => pointB.cost - pointA.cost;

export const isDatesEqual = (dateA, dateB) => (dateA === null && dateB === null) ? true : dayjs(dateA).isSame(dateB, 'D');

export const isDateValidate = (dateBegin, dateEnd) => dateBegin !== undefined && dateEnd !== undefined && dayjs(dateBegin).isBefore(dayjs(dateEnd));
