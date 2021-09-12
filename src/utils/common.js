export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const isPositiveInteger = (number) => ((number ^ 0) === number) && number >= 0;

export const capitalize = (string) => string.toString().charAt(0).toUpperCase() + string.toString().slice(1).toLowerCase();
