import AbstractView from "./abstract.js";

export default class Board extends AbstractView {
  get template() {
    return `<section class="board container"></section>`;
  }
}
