import {createElement} from "../utils.js";

export default class TaskList {
  constructor() {
    this._element = null;
  }

  get template() {
    return `<div class="board__tasks"></div>`;
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
