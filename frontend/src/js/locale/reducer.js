import * as ActionTypes from "./action_types";

export default function (state, action) {
  if (typeof state == "undefined") {
    state = Immutable.Map();
  }
  switch(action.type) {
  case ActionTypes.LOAD_STRINGS:
    state = Immutable.fromJS(action.strings);
  }
  return state;
}
