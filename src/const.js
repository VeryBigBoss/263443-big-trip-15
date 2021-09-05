export const OFFERS = new Map();
OFFERS.set('Taxi', [{title: 'Order Uber', price: '20'}, {title: 'Choose radio', price: '5'}, {title: 'Switch to comfort', price: '10'}, {title: 'Choose a car', price: '30'}]);
OFFERS.set('Flight', [{title: 'Add luggage', price: '50'}, {title: 'Switch to comfort', price: '80'}, {title: 'Add meal', price: '25'}]);
OFFERS.set('Ship', [{title: 'Add luggage', price: '50'}, {title: 'Switch to comfort', price: '80'}, {title: 'Offer3', price: '120'}, {title: 'Offer4', price: '120'}, {title: 'Offer5', price: '120'}]);
OFFERS.set('Train', [{title: 'Switch to comfort', price: '100'}, {title: 'Order dinner', price: '30'}]);
OFFERS.set('Drive', [{title: 'Rent a car', price: '200'}, {title: 'Choose a car', price: '30'}, {title: 'Offer3', price: '120'}, {title: 'Offer4', price: '120'}, {title: 'Offer5', price: '120'}]);
OFFERS.set('Check-in', [{title: 'Add breakfast', price: '50'}, {title: 'Add dinner', price: '120'}, {title: 'Add dinner', price: '150'}]);
OFFERS.set('Sightseeing', [{title: 'Book tickets', price: '40'}, {title: 'Lunch in city', price: '30'}]);

export const DESCRIPTIONS = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
];

export const POINT_TYPES = [
  'Taxi',
  'Bus',
  'Train',
  'Ship',
  'Drive',
  'Flight',
  'Check-in',
  'Sightseeing',
  'Restaurant',
];

export const CITIES = [
  'Moscow',
  'Saint-Petersburg',
  'Rostov-on-Don',
  'Samara',
  'Petrozavodsk',
  'Murmansk',
];

export const DESTINATION = [
  {
    description: 'Chamonix, is a beautiful city, a true asian pearl, with crowded streets.',
    name: 'Moscow',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163317',
        description: 'Chamonix parliament building',
      },
    ],
  },
  {
    description: 'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
    name: 'Samara',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163317',
        description: 'Aliquam erat volutpat.',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163317',
        description: 'Fusce tristique felis at fermentum pharetra.',
      },
    ],
  },
  {
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    name: 'Murmansk',
    pictures: [
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163317',
        description: 'Aliquam erat volutpat.',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163317',
        description: 'Fusce tristique felis at fermentum pharetra.',
      },
      {
        src: 'http://picsum.photos/300/200?r=0.0762563005163317',
        description: 'Fusce tristique felis at fermentum pharetra.',
      },
    ],
  },
];

export const filters = ['everything',
  'future',
  'past',
];

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
