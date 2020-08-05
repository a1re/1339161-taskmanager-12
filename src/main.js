const TASKS_AMOUNT = 22;
const TASKS_AMOUNT_PER_TIER = 8;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

import {makeControlTemplate} from "./view/control.js";
import {makeFiltersTemplate} from "./view/filters.js";
import {makeBoardTemplate} from "./view/board.js";
import {makeSortingTemplate} from "./view/sorting.js";
import {makeNewTaskTemplate} from "./view/new-task.js";
import {makeLoadMoreButtonTemplate} from "./view/load-more-button.js";
import {makeCardTemplate} from "./view/card.js";
import {generateTask} from "./mock/task.js";
import {generateFilter} from "./mock/filter.js";

const tasks = new Array(TASKS_AMOUNT).fill().map(generateTask);
const filters = generateFilter(tasks);

const siteMainBlock = document.querySelector(`.main`);
const siteHeaderBlock = siteMainBlock.querySelector(`.main__control`);
render(siteHeaderBlock, makeControlTemplate(), `beforeend`);
render(siteMainBlock, makeFiltersTemplate(filters), `beforeend`);
render(siteMainBlock, makeBoardTemplate(), `beforeend`);

const siteBoardBlock = siteMainBlock.querySelector(`.board`);
render(siteBoardBlock, makeSortingTemplate(), `afterbegin`);

const siteTasksListBlock = siteMainBlock.querySelector(`.board__tasks`);
render(siteTasksListBlock, makeNewTaskTemplate(tasks[0]), `beforeend`);

for (let i = 1; i < Math.min(tasks.length, TASKS_AMOUNT_PER_TIER); i++) {
  render(siteTasksListBlock, makeCardTemplate(tasks[i]), `beforeend`);
}

if (tasks.length > TASKS_AMOUNT_PER_TIER) {
  render(siteBoardBlock, makeLoadMoreButtonTemplate(), `beforeend`);

  let renderedTasksCount = TASKS_AMOUNT_PER_TIER;
  const loadMoreButton = siteBoardBlock.querySelector(`.load-more`);

  loadMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();

    tasks
      .slice(renderedTasksCount, renderedTasksCount + TASKS_AMOUNT_PER_TIER)
      .forEach((task) => render(siteTasksListBlock, makeCardTemplate(task), `beforeend`));

    renderedTasksCount += TASKS_AMOUNT_PER_TIER;

    if (renderedTasksCount >= tasks.length) {
      loadMoreButton.remove();
    }
  });
}

