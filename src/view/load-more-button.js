import {createElement} from "../utils.js";

export default class LoadMoreButton {
  constructor() {
    this._element = null;
  }

  get template() {
    return `<button class="load-more" type="button">load more</button>`;
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
