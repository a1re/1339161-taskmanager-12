import AbstractView from "./abstract.js";

export default class TaskList extends AbstractView {
  get template() {
    return `<div class="board__tasks"></div>`;
  }
}
