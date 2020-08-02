const TASKS_AMOUNT = 3;

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

const siteMainBlock = document.querySelector(`.main`);
const siteHeaderBlock = siteMainBlock.querySelector(`.main__control`);
render(siteHeaderBlock, makeControlTemplate(), `beforeend`);
render(siteMainBlock, makeFiltersTemplate(), `beforeend`);
render(siteMainBlock, makeBoardTemplate(), `beforeend`);

const siteBoardBlock = siteMainBlock.querySelector(`.board`);
render(siteBoardBlock, makeSortingTemplate(), `afterbegin`);
render(siteBoardBlock, makeLoadMoreButtonTemplate(), `beforeend`);

const siteTasksListBlock = siteMainBlock.querySelector(`.board__tasks`);
render(siteTasksListBlock, makeNewTaskTemplate(), `beforeend`);

for (let i = 0; i < TASKS_AMOUNT; i++) {
  render(siteTasksListBlock, makeCardTemplate(), `beforeend`);
}
