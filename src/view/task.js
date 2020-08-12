import {isTaskExpired, isTaskRepeating, humanizeTaskDueDate, createElement} from "../utils.js";

export default class Task {
  constructor(task) {
    this._element = null;

    this._task = task;
  }

  get template() {
    const {color, description, dueDate, repeating, isArchive, isFavorite} = this._task;

    const date = (dueDate !== null) ? humanizeTaskDueDate(dueDate) : ``;
    const deadlineClassName = (isTaskExpired(dueDate)) ? `card--deadline` : ``;
    const repeatingClassName = (isTaskRepeating(repeating)) ? `card--repeat` : ``;
    const favoriteClassName = (isFavorite) ? `card__btn--favorites card__btn--disabled` : `card__btn--favorites`;
    const archiveClassName = (isArchive) ? `card__btn--archive card__btn--disabled` : `card__btn--archive`;

    return `<article class="card card--${color} ${deadlineClassName} ${repeatingClassName}">
              <div class="card__form">
                <div class="card__inner">
                  <div class="card__control">
                    <button type="button" class="card__btn card__btn--edit">
                      edit
                    </button>
                    <button type="button" class="card__btn ${archiveClassName}">
                      archive
                    </button>
                    <button type="button" class="card__btn ${favoriteClassName}">
                      favorites
                    </button>
                  </div>
                  <div class="card__color-bar">
                    <svg class="card__color-bar-wave" width="100%" height="10">
                      <use xlink:href="#wave"></use>
                    </svg>
                  </div>
                  <div class="card__textarea-wrap">
                    <p class="card__text">${description}</p>
                  </div>
                  <div class="card__settings">
                    <div class="card__details">
                      <div class="card__dates">
                        <div class="card__date-deadline">
                          <p class="card__input-deadline-wrap">
                            <span class="card__date">${date}</span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </article>`;
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
