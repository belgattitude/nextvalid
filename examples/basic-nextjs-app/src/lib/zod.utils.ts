export const zodStringToInt = (arg: unknown) => {
  if (typeof arg === 'string') {
    const number = Number.parseInt(arg, 10);
    if (!isNaN(number)) {
      return number;
    }
  }
  return arg;
};
