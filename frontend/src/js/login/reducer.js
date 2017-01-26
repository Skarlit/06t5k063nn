import * as actionTypes from "./action_types";

// login


export default function (state, action) {
  if (typeof state == "undefined") {
    state = Immutable.Map();
  }
  switch(action.type) {
  case actionTypes.USER_LOGIN:
    state = state.update("currentUser", () => Immutable.fromJS(action.user));
  }
  return state;
}
