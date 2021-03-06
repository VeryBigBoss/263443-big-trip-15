import dayjs from 'dayjs';

export const calculateDuration = (dateBegin, dateEnd) => dayjs(dateEnd).diff(dayjs(dateBegin), 'millisecond');

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
  const ONE_MINUTE = 60000;
  const ONE_HOUR = 3600000;
  const ONE_DAY = 86400000;
  const days = Math.floor(duration / ONE_DAY);
  const hours = Math.floor((duration % ONE_DAY) / ONE_HOUR);
  const minute = Math.floor((duration % ONE_HOUR) / ONE_MINUTE);
  return `${(days > 0 ? `${numberFormat(days)}D ` : '') + (hours > 0 ? `${numberFormat(hours)}H ` : '')  }${numberFormat(minute)}M`;
};

export const isEverything = (date) => date !== null;
export const isFuture = (dateFrom, dateTo) => (dayjs(dateFrom).isBefore(dayjs(), 'day') && (dayjs(dateTo).isAfter(dayjs(), 'day') || dayjs(dateTo).isSame(dayjs(), 'day')))
  || (dayjs(dateFrom).isAfter(dayjs(), 'day') || dayjs(dateFrom).isSame(dayjs(), 'day'));
export const isPast = (date) => dayjs(date).isBefore(dayjs(), 'day');

export const sortPointByDayAsc = (pointA, pointB) => dayjs(pointA.dateTimeBegin).diff(dayjs(pointB.dateTimeBegin));
export const sortPointByTime = (pointA, pointB) => dayjs(pointB.dateTimeEnd).diff(pointB.dateTimeBegin, 'millisecond') - dayjs(pointA.dateTimeEnd).diff(pointA.dateTimeBegin, 'millisecond');
export const sortPointByPriceDesc = (pointA, pointB) => pointB.cost - pointA.cost;

export const isDatesEqual = (dateA, dateB) => (dateA === null && dateB === null) ? true : dayjs(dateA).isSame(dateB, 'D');

export const isDateValidate = (dateBegin, dateEnd) => dateBegin !== undefined && dateEnd !== undefined && dayjs(dateBegin).isBefore(dayjs(dateEnd));
