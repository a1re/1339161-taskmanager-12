import AbstractView from "./abstract.js";

const makeFilterItemTemplate = (filter, currentFilterType) => {
  const {type, name, count} = filter;

  return `<input
          type="radio"
          id="filter__${name}"
          class="filter__input visually-hidden"
          name="filter"
          ${(type === currentFilterType) ? `checked` : ``}
          ${(count === 0) ? `disabled` : ``}
          value="${type}"
        />
        <label for="filter__${name}" class="filter__label">
          ${name} <span class="filter__${name}-count">${count}</span></label
        >`;
};

export default class Filters extends AbstractView {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilterType = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  get template() {
    const filterItemsTemplate = this._filters
      .map((filter) => makeFilterItemTemplate(filter, this._currentFilterType))
      .join(``);

    return `<section class="main__filter filter container">${filterItemsTemplate}</section>`;
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }

  set filterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.element.addEventListener(`change`, this._filterTypeChangeHandler);
  }
}
