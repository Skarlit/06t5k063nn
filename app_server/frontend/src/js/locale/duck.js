import Cookie from "js-cookie";

export const REQUEST_STRINGS = "LOCALE/REQUEST_STRINGS";
export const REQ_SUCCESS = "LOCALE/REQ_SUCCESS";
export const REQ_FAIL = "LOCALE/REQ_FAIL";
export const LOAD_STRINGS = "LOCALE/LOAD_STRINGS";

export const localeChangeAction = locale => ({ type: REQUEST_STRINGS, locale });
export const loadStringsAction = strings => ({ type: LOAD_STRINGS, strings });

const initialState = Immutable.fromJS({ current: { }, cached: {} });

export default function (state = initialState, action) {
  let newState = state;
  switch (action.type) {
  case LOAD_STRINGS: {
    const currentLocale = state.getIn(["current", "locale"]);

      // if current language not in cached, save it.
    if (!state.getIn(["cached", currentLocale])) {
      newState = state.updateIn(["cached", currentLocale], () => state.get("current"));
    }

    newState = newState.update("current", () => Immutable.fromJS(action.strings));
    Cookie.set("locale", newState.getIn(["current", "locale"]), { secure: true });
    break;
  }
  default:
    break;
  }
  return newState;
}
