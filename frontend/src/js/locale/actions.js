import * as ActionTypes from "./action_types";

const localeChangeAction = (locale) => {
  return {type: ActionTypes.REQUEST_STRINGS, locale: locale};
};

const loadStringsAction = (strings) => {
  return {
    type: ActionTypes.LOAD_STRINGS,
    strings: strings
  };
};

export default { localeChangeAction, loadStringsAction };
