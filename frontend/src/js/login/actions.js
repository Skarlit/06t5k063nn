import * as actionTypes from "./action_types";

export function loginViaFacebook(user) {
  return {
    type: actionTypes.USER_LOGIN,
    user: user
  };
}
