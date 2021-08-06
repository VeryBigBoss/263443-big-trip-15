import dayjs from 'dayjs';
import {OFFERS, DESCRIPTIONS, POINT_TYPES, CITIES} from '../const.js';
import {getRandomInteger} from '../utils';


const MIN_COUNT_TEXT_DESCRIPTION = 1;
const MAX_COUNT_TEXT_DESCRIPTION = 5;
const MAX_COUNT_OFFERS = 5;
const MAX_COST = 200;
const MAX_COUNT_PICTURES = 5;

const generatePointType = () => {
  const randomIndex = getRandomInteger(0, POINT_TYPES.length - 1);
  return POINT_TYPES[randomIndex];
};
const generateCity = () => {
  const randomIndex = getRandomInteger(0, CITIES.length - 1);
  return CITIES[randomIndex];
};
const generateCost = () => getRandomInteger(0, MAX_COST);
const generateDescription = () => {
  const randomCount = getRandomInteger(MIN_COUNT_TEXT_DESCRIPTION, MAX_COUNT_TEXT_DESCRIPTION);
  const resultDescription = [];
  let i = 0;
  do {
    const randomIndex = getRandomInteger(0, DESCRIPTIONS.length - 1);
    resultDescription.push(DESCRIPTIONS[randomIndex]);
    i++;
  }
  while (i !== randomCount);

  return resultDescription.join(' ');
};

const generateDateTimeBegin = () => {
  const maxDaysGap = 7;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  const hourGap = getRandomInteger(0, 23);
  const minuteGap = getRandomInteger(0, 59);
  return dayjs().add(daysGap, 'day').add(hourGap, 'hour').add(minuteGap, 'minute').toDate();
};
const generateDateTimeEnd = (date) => {
  const maxDaysGap = 10;
  const daysGap = getRandomInteger(0, maxDaysGap);
  const hourGap = getRandomInteger(0, 23);
  const minuteGap = getRandomInteger(0, 59);
  return dayjs(date).add(daysGap, 'day').add(hourGap, 'hour').add(minuteGap, 'minute').toDate();
};

const generateOffers = (pointType) => {
  const offersArr = OFFERS.get(pointType);
  const countRandom = getRandomInteger(0, MAX_COUNT_OFFERS);
  if (offersArr === undefined) {
    return undefined;
  } else if (countRandom > offersArr.length) {
    return offersArr;
  } else {
    return offersArr.slice(0, countRandom);
  }
};
const generatePictures = () => {
  const pictures = [];
  for (let i = 0; i < getRandomInteger(1, MAX_COUNT_PICTURES); i++) {
    pictures.push({src: `http://picsum.photos/248/152?r=${getRandomInteger(50, 150)}`, description: 'Chamonix parliament building'});
  }
  return pictures;
};

export const generateTripEvent = () => {
  const dateBegin = generateDateTimeBegin();
  const dateEnd = generateDateTimeEnd(dateBegin);
  const pointType = generatePointType();
  return {
    type: pointType,
    city: generateCity(),
    dateTimeBegin: dateBegin, //'18/03/19 12:25',
    dateTimeEnd: generateDateTimeEnd(dateEnd),
    cost: generateCost(),
    offers: generateOffers(pointType),
    destination: {
      description: generateDescription(),
      name: generateCity(),
      pictures: generatePictures(),
    },
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};
