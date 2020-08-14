import {createElement} from "../utils.js";

export default class NoTask {
  constructor() {
    this._element = null;
  }

  get template() {
    return `<p class="board__no-tasks">
      Click «ADD NEW TASK» in menu to create your first task
    </p>`;
  }

  get element() {
    if (!this._element) {
      this._element = createElement(this.template);
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
