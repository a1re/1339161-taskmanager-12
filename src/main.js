import SiteMenuView from "./view/site-menu.js";
import StatisticsView from "./view/statistics.js";
import BoardPresenter from "./presenter/board.js";
import FilterPresenter from "./presenter/filters.js";
import TasksModel from "./model/tasks.js";
import FiltersModel from "./model/filters.js";
import {render, RenderPosition, remove} from "./utils/render.js";
import {MenuItem, UpdateType, FilterType} from "./const.js";
import Api from "./api/index.js";
import Store from "./api/store.js";
import Provider from "./api/provider.js";

const AUTHORIZATION = `Basic jP2sd7vfBncl9sa8a`;
const END_POINT = `https://12.ecmascript.pages.academy/task-manager`;
const STORE_PREFIX = `taskmanager-localstorage`;
const STORE_VER = `v12`;
const STORE_NAME = `${STORE_PREFIX}-${STORE_VER}`;

const siteMainBlock = document.querySelector(`.main`);
const siteHeaderBlock = siteMainBlock.querySelector(`.main__control`);

const api = new Api(END_POINT, AUTHORIZATION);
const store = new Store(STORE_NAME, window.localStorage);
const apiWithProvider = new Provider(api, store);
const tasksModel = new TasksModel();
const filtersModel = new FiltersModel();

const siteMenuComponent = new SiteMenuView();
const boardPresenter = new BoardPresenter(siteMainBlock, tasksModel, filtersModel, apiWithProvider);
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
      remove(statisticsComponent);
      break;
    case MenuItem.STATISTICS:
      statisticsComponent = new StatisticsView(tasksModel.tasks);
      render(siteMainBlock, statisticsComponent, RenderPosition.BEFOREEND);
      boardPresenter.destroy();
      break;
  }
};

filterPresenter.init();
boardPresenter.init();

apiWithProvider.getTasks()
  .then((tasks) => {
    tasksModel.setTasks(UpdateType.INIT, tasks);
    render(siteHeaderBlock, siteMenuComponent, RenderPosition.BEFOREEND);
    siteMenuComponent.menuClickHandler = handleSiteMenuClick;
  })
  .catch(() => {
    tasksModel.setTasks(UpdateType.INIT, []);
    render(siteHeaderBlock, siteMenuComponent, RenderPosition.BEFOREEND);
    siteMenuComponent.menuClickHandler = handleSiteMenuClick;
  });

window.addEventListener(`online`, () => {
  document.title = document.title.replace(`  [offline]`, ``);
  apiWithProvider.sync();
});

window.addEventListener(`offline`, () => {
  document.title += `  [offline]`;
});

window.addEventListener(`load`, () => {
  navigator.serviceWorker.register(`/sw.js`)
    .then(() => {
      console.log(`ServiceWorker available`); //eslint-disable-line
    }).catch(() => {
      console.log(`ServiceWorker isn't available`); //eslint-disable-line
    });
});
