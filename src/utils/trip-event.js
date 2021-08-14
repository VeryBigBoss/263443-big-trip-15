import dayjs from 'dayjs';

export const calculateDuration = (dateBegin, dateEnd) => dayjs(dateEnd).diff(dayjs(dateBegin), 'minute');

export const humanizeMinuteAndHours = (date) => dayjs(date).format('HH:mm');
export const humanizeDay = (date) => dayjs(date).format('MMM D');
export const humanizeDate = (date) => dayjs(date).format('DD/MM/YY HH:mm');

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

export const isFuture = (date) => dayjs(date).isSameOrAfter(dayjs(), 'day');
export const isPast = (date) => dayjs(date).isBefore(dayjs(date), 'day');
// export const isEverything = () => dayjs(date).isBefore(dayjs(date), 'day');
