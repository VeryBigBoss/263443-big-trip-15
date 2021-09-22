export const isPositiveInteger = (number) => ((number ^ 0) === number) && number > 0;

export const capitalize = (string) => string.toString().charAt(0).toUpperCase() + string.toString().slice(1).toLowerCase();

export const isEscKey = (evt) => evt.keyCode === 27;
