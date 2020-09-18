export const getRandomInt = (a = 0, b = 1) => {
  const lower = Math.floor(Math.min(a, b));
  const upper = Math.ceil(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};
