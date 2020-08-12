import {createElement} from "../utils.js";

export default class Filter {
  constructor(filters) {
    this._filters = filters;
    this._element = null;
  }

  get template() {
    const makeFilterItemTemplate = (filter, isChecked) => {
      const {name, count} = filter;

      return `<input
              type="radio"
              id="filter__${name}"
              class="filter__input visually-hidden"
              name="filter"
              ${(isChecked) ? `checked` : ``}
              ${(count === 0) ? `disabled` : ``}
            />
            <label for="filter__${name}" class="filter__label">
              ${name} <span class="filter__${name}-count">${count}</span></label
            >`;
    };

    const filterItemsTemplate = this._filters
      .map((filter, index) => makeFilterItemTemplate(filter, index === 0))
      .join(``);

    return `<section class="main__filter filter container">${filterItemsTemplate}</section>`;
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
