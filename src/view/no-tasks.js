import AbstractView from "./abstract.js";

export default class NoTasks extends AbstractView {
  get template() {
    return `<p class="board__no-tasks">
      Click «ADD NEW TASK» in menu to create your first task
    </p>`;
  }
}
