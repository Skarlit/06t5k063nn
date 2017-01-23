import * as ActionTypes from "./action_types";
import Cookie from "js-cookie";

export default function (state, action) {
  if (typeof state == "undefined") {
    state = Immutable.Map();
  }
  switch(action.type) {
  case ActionTypes.LOAD_STRINGS:
    state = Immutable.fromJS(action.strings);
    Cookie.set("locale", state.get("locale"), { secure: true });
  }
  return state;
}
