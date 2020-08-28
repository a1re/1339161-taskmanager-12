import {COLORS} from "../const.js";
import {getRandomInt} from "../utils/common.js";

const generateId = () => Date.now() * parseInt(Math.random() * 10000, 10);

const generateDescription = () => {
  const descriptions = [
    `Изучить теорию`,
    `Сделать домашнее задание`,
    `Пройти интенсив на 100%`
  ];

  const randomIndex = getRandomInt(0, descriptions.length - 1);

  return descriptions[randomIndex];
};

const generateDate = () => {
  const isDate = Boolean(getRandomInt(0, 1));

  if (!isDate) {
    return null;
  }

  const maxDaysGap = 7;
  const daysGap = getRandomInt(-maxDaysGap, maxDaysGap);
  const currentDate = new Date();

  currentDate.setHours(23, 59, 59, 999);

  currentDate.setDate(currentDate.getDate() + daysGap);

  return new Date(currentDate);
};

const generateRepeating = (isEmpty = false) => {
  if (isEmpty || Boolean(getRandomInt(0, 1))) {
    return {
      mo: false,
      tu: false,
      we: false,
      th: false,
      fr: false,
      sa: false,
      su: false
    };
  }

  return {
    mo: Boolean(getRandomInt(0, 1)),
    tu: Boolean(getRandomInt(0, 1)),
    we: Boolean(getRandomInt(0, 1)),
    th: Boolean(getRandomInt(0, 1)),
    fr: Boolean(getRandomInt(0, 1)),
    sa: Boolean(getRandomInt(0, 1)),
    su: Boolean(getRandomInt(0, 1)),
  };
};

const getRandomColor = () => {
  const randomIndex = getRandomInt(0, COLORS.length - 1);

  return COLORS[randomIndex];
};

export const generateTask = () => {
  const dueDate = generateDate();
  return {
    id: generateId(),
    description: generateDescription(),
    dueDate,
    repeating: generateRepeating(dueDate === null),
    color: getRandomColor(),
    isArchive: Boolean(getRandomInt(0, 1)),
    isFavorite: Boolean(getRandomInt(0, 1))
  };
};
