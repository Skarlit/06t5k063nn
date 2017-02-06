import * as ActionTypes from "./action_types";
import Cookie from "js-cookie";

const initialState = Immutable.fromJS({
  current: {

  },
  cached: {

  },
});

export default function (state = initialState, action) {
  let newState = state;
  switch (action.type) {
    case ActionTypes.LOAD_STRINGS:
      const currentLocale = state.getIn(["current", "locale"]);

      // if current language not in cached, save it.
      if (!state.getIn(["cached", currentLocale])) {
        newState = state.updateIn(["cached", currentLocale], () => state.get("current"));
      }

      newState = newState.update("current", () => Immutable.fromJS(action.strings));
      Cookie.set("locale", newState.getIn(["current", "locale"]), { secure: true });
      break;
    default:
      break;
  }
  return newState;
}
