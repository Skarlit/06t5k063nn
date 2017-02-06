import * as ActionTypes from "./action_types";

const localeChangeAction = locale => ({ type: ActionTypes.REQUEST_STRINGS, locale });

const loadStringsAction = strings => ({
  type: ActionTypes.LOAD_STRINGS,
  strings,
});

export default { localeChangeAction, loadStringsAction };
