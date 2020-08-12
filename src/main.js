const TASKS_AMOUNT = 22;
const TASKS_AMOUNT_PER_TIER = 8;

import SiteMenuView from "./view/site-menu.js";
import LoadMoreButtonView from "./view/load-more-button.js";
import BoardView from "./view/board.js";
import SortingView from "./view/sorting.js";
import FilterView from "./view/filters.js";
import TaskListView from "./view/task-list.js";
import TaskEditView from "./view/task-edit.js";
import TaskView from "./view/task.js";

import {generateTask} from "./mock/task.js";
import {generateFilter} from "./mock/filter.js";
import {render, RenderPosition} from "./utils.js";

const tasks = new Array(TASKS_AMOUNT).fill().map(generateTask);
const filters = generateFilter(tasks);

const siteMainBlock = document.querySelector(`.main`);
const siteHeaderBlock = siteMainBlock.querySelector(`.main__control`);

const renderTask = (taskListElement, task) => {
  const taskComponent = new TaskView(task);
  const taskEditComponent = new TaskEditView(task);

  const replaceCardToForm = () => {
    taskListElement.replaceChild(taskEditComponent.element, taskComponent.element);
  };

  const replaceFormToCard = () => {
    taskListElement.replaceChild(taskComponent.element, taskEditComponent.element);
  };

  taskComponent.element.querySelector(`.card__btn--edit`).addEventListener(`click`, () => {
    replaceCardToForm();
  });

  taskEditComponent.element.querySelector(`form`).addEventListener(`submit`, (evt) => {
    evt.preventDefault();
    replaceFormToCard();
  });

  render(taskListElement, taskComponent.element, RenderPosition.BEFOREEND);
};

render(siteHeaderBlock, new SiteMenuView().element, RenderPosition.BEFOREEND);
render(siteMainBlock, new FilterView(filters).element, RenderPosition.BEFOREEND);

const boardComponent = new BoardView();
render(siteMainBlock, boardComponent.element, RenderPosition.BEFOREEND);
render(boardComponent.element, new SortingView().element, RenderPosition.AFTERBEGIN);

const taskListComponent = new TaskListView();
render(boardComponent.element, taskListComponent.element, RenderPosition.BEFOREEND);

for (let i = 0; i < Math.min(tasks.length, TASKS_AMOUNT_PER_TIER); i++) {
  renderTask(taskListComponent.element, tasks[i]);
}

if (tasks.length > TASKS_AMOUNT_PER_TIER) {
  let renderedTasksCount = TASKS_AMOUNT_PER_TIER;

  const loadMoreButtonComponent = new LoadMoreButtonView();
  render(boardComponent.element, loadMoreButtonComponent.element, RenderPosition.BEFOREEND);

  loadMoreButtonComponent.element.addEventListener(`click`, (evt) => {
    evt.preventDefault();

    tasks
      .slice(renderedTasksCount, renderedTasksCount + TASKS_AMOUNT_PER_TIER)
      .forEach((task) => renderTask(taskListComponent.element, task));

    renderedTasksCount += TASKS_AMOUNT_PER_TIER;

    if (renderedTasksCount >= tasks.length) {
      loadMoreButtonComponent.element.remove();
      loadMoreButtonComponent.removeElement();
    }
  });
}

