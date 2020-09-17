const TASKS_AMOUNT = 22;

import SiteMenuView from "./view/site-menu.js";
import {generateTask} from "./mock/task.js";
import BoardPresenter from "./presenter/board.js";
import FilterPresenter from "./presenter/filters.js";
import TasksModel from "./model/tasks.js";
import FiltersModel from "./model/filters.js";
import {render, RenderPosition} from "./utils/render.js";

const tasks = new Array(TASKS_AMOUNT).fill().map(generateTask);

const tasksModel = new TasksModel();
tasksModel.tasks = tasks;

const filtersModel = new FiltersModel();

const siteMainBlock = document.querySelector(`.main`);
const siteHeaderBlock = siteMainBlock.querySelector(`.main__control`);

const boardPresenter = new BoardPresenter(siteMainBlock, tasksModel, filtersModel);
const filterPresenter = new FilterPresenter(siteMainBlock, tasksModel, filtersModel);

render(siteHeaderBlock, new SiteMenuView().element, RenderPosition.BEFOREEND);

filterPresenter.init();
boardPresenter.init();

document.querySelector(`#control__new-task`).addEventListener(`click`, (evt) => {
  evt.preventDefault();
  boardPresenter.createTask();
});
