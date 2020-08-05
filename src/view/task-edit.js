import {COLORS} from "../const.js";
import {isTaskExpired, isTaskRepeating, humanizeTaskDueDate} from "../utils.js";

const makeTaskEditDateTemplate = (dueDate) => {
  let template = `<button class="card__date-deadline-toggle" type="button">
    date: <span class="card__date-status">${(dueDate !== null) ? `yes` : `no`}</span>
    </button>`;

  if (dueDate === null) {
    return template;
  }

  return template + ` <fieldset class="card__date-deadline">
    <label class="card__input-deadline-wrap">
      <input
        class="card__date"
        type="text"
        placeholder=""
        name="date"
        value="${humanizeTaskDueDate(dueDate)}"
      />
    </label>
  </fieldset>`;
};

const makeTaskEditColorsTemplate = (currentColor) => {
  return COLORS.map((color) => `<input
    type="radio"
    id="color-${color}"
    class="card__color-input card__color-input--${color} visually-hidden"
    name="color"
    value="${color}"
    ${(currentColor === color) ? `checked` : ``}
  />
  <label
    for="color-${color}"
    class="card__color card__color--${color}"
  >${color}</label>`).join(``);
};

const makeTaskEditRepeatingTemplate = (repeating) => {
  let template = `<button class="card__repeat-toggle" type="button">
    repeat: <span class="card__repeat-status">${(isTaskRepeating(repeating)) ? `yes` : `no`}</span>
    </button>`;

  if (!isTaskRepeating(repeating)) {
    return template;
  }

  template += `<fieldset class="card__repeat-days"><div class="card__repeat-days-inner">`;

  Object.entries(repeating).map(([day, isChecked]) => {
    template += `<input
                   class="visually-hidden card__repeat-day-input"
                   type="checkbox"
                   id="repeat-${day}"
                   name="repeat"
                   value="-${day}"
                   ${(isChecked) ? `checked` : ``}
                 />
                 <label class="card__repeat-day" for="repeat-${day}">${day}</label>`;
  });

  template += `</div></fieldset>`;

  return template;
};

export const makeTaskEditTemplate = (task = {}) => {
  const {
    color = `black`,
    description = ``,
    dueDate = null,
    repeating = {
      mon: false,
      tue: false,
      wed: false,
      thu: false,
      fri: false,
      sat: false,
      sun: false,
    },
  } = task;

  const deadlineClassName = (isTaskExpired(dueDate)) ? `card--deadline` : ``;
  const dateTemplate = makeTaskEditDateTemplate(dueDate);
  const repeatingClassName = (isTaskRepeating(repeating)) ? `card--repeat` : ``;
  const repeatingTemplate = makeTaskEditRepeatingTemplate(repeating);
  const colorsTemplate = makeTaskEditColorsTemplate(color);

  return `<article class="card card--edit card--${color} ${deadlineClassName} ${repeatingClassName}">
            <form class="card__form" method="get">
              <div class="card__inner">
                <div class="card__color-bar">
                  <svg class="card__color-bar-wave" width="100%" height="10">
                    <use xlink:href="#wave"></use>
                  </svg>
                </div>

                <div class="card__textarea-wrap">
                  <label>
                    <textarea
                      class="card__text"
                      placeholder="Start typing your text here..."
                      name="text"
                    >${description}.</textarea>
                  </label>
                </div>

                <div class="card__settings">
                  <div class="card__details">
                    <div class="card__dates">
                      ${dateTemplate}

                      ${repeatingTemplate}
                    </div>
                  </div>

                  <div class="card__colors-inner">
                    <h3 class="card__colors-title">Color</h3>
                    <div class="card__colors-wrap">
                      ${colorsTemplate}
                    </div>
                  </div>
                </div>

                <div class="card__status-btns">
                  <button class="card__save" type="submit">save</button>
                  <button class="card__delete" type="button">cancel</button>
                </div>
              </div>
            </form>
          </article>`;
};
