import * as ActionTypes from "./action_types";
import Cookie from "js-cookie";

const initialState = Immutable.fromJS({
  currentLanguage: {

  },
  cached: {

  },
});

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionTypes.LOAD_STRINGS:
      state = state.update("currentLanguage", Immutable.fromJS(action.strings));
      if (!state.getIn(["cached", action.strings.locale])) {
        state = state.updateIn(["cached", action.strings.locale], Immutable.fromJS(action.strings));
      }
      Cookie.set("locale", state.get("locale"), { secure: true });
  }
  return state;
}
