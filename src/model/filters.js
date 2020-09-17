import Observer from "../utils/observer.js";
import {FilterType} from "../const.js";

export default class Filters extends Observer {
  constructor() {
    super();

    this._activeFilter = FilterType.ALL;
  }

  setFilter(updateType, filter) {
    this._activeFilter = filter;
    this._notify(updateType, filter);
  }

  get filter() {
    return this._activeFilter;
  }
}
