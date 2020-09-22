const TASKS_AMOUNT = 22;

import SiteMenuView from "./view/site-menu.js";
import StatisticsView from "./view/statistics.js";
import {generateTask} from "./mock/task.js";
import BoardPresenter from "./presenter/board.js";
import FilterPresenter from "./presenter/filters.js";
import TasksModel from "./model/tasks.js";
import FiltersModel from "./model/filters.js";
import {render, RenderPosition, remove} from "./utils/render.js";
import {MenuItem, UpdateType, FilterType} from "./const.js";

const tasks = new Array(TASKS_AMOUNT).fill().map(generateTask);

const tasksModel = new TasksModel();
tasksModel.tasks = tasks;

const filtersModel = new FiltersModel();

const siteMainBlock = document.querySelector(`.main`);
const siteHeaderBlock = siteMainBlock.querySelector(`.main__control`);
const siteMenuComponent = new SiteMenuView();

render(siteHeaderBlock, siteMenuComponent, RenderPosition.BEFOREEND);

const boardPresenter = new BoardPresenter(siteMainBlock, tasksModel, filtersModel);
const filterPresenter = new FilterPresenter(siteMainBlock, tasksModel, filtersModel);

const handleTaskNewFormClose = () => {
  siteMenuComponent.element.querySelector(`[value=${MenuItem.TASKS}]`).disabled = false;
  siteMenuComponent.menuItem = MenuItem.TASKS;
};

let statisticsComponent = null;

const handleSiteMenuClick = (menuItem) => {
  switch (menuItem) {
    case MenuItem.ADD_NEW_TASK:
      remove(statisticsComponent);
      boardPresenter.destroy();
      filtersModel.setFilter(UpdateType.MAJOR, FilterType.ALL);
      boardPresenter.init();
      boardPresenter.createTask(handleTaskNewFormClose);
      siteMenuComponent.element.querySelector(`[value=${MenuItem.TASKS}]`).disabled = true;
      break;
    case MenuItem.TASKS:
      boardPresenter.init();
      break;
    case MenuItem.STATISTICS:
      statisticsComponent = new StatisticsView(tasksModel.tasks);
      render(siteMainBlock, statisticsComponent, RenderPosition.BEFOREEND);
      boardPresenter.destroy();
      break;
  }
};

siteMenuComponent.menuClickHandler = handleSiteMenuClick;

filterPresenter.init();
boardPresenter.init();


