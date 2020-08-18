import AbstractView from "./abstract.js";

export default class LoadMoreButton extends AbstractView {
  constructor() {
    super();

    this._clickHandler = this._clickHandler.bind(this);
  }

  get template() {
    return `<button class="load-more" type="button">load more</button>`;
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  set clickHandler(callback) {
    this._callback.click = callback;
    this.element.addEventListener(`click`, this._clickHandler);
  }
}
