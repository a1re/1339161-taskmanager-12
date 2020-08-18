const TASKS_AMOUNT = 22;

import SiteMenuView from "./view/site-menu.js";
import FilterView from "./view/filters.js";

import BoardPresenter from "./presenter/board.js";
import {render, RenderPosition} from "./utils/render.js";

import {generateTask} from "./mock/task.js";
import {generateFilter} from "./mock/filter.js";

const tasks = new Array(TASKS_AMOUNT).fill().map(generateTask);
const filters = generateFilter(tasks);

const siteMainBlock = document.querySelector(`.main`);
const siteHeaderBlock = siteMainBlock.querySelector(`.main__control`);

const boardPresenter = new BoardPresenter(siteMainBlock);

render(siteHeaderBlock, new SiteMenuView().element, RenderPosition.BEFOREEND);
render(siteMainBlock, new FilterView(filters).element, RenderPosition.BEFOREEND);

boardPresenter.init(tasks);
