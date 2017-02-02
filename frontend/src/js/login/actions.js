import * as actionTypes from "./action_types";

export function loginViaFacebook(user) {
  return {
    type: actionTypes.USER_LOGIN,
    user: user
  };
}

export function deleteUserSession() {
  return {
    type: actionTypes.DELETE_USER_SESSION
  };
}

export function showModal() {
  return {
    type: actionTypes.SHOW_MODAL
  };
}

export function hideModal() {
  return {
    type: actionTypes.HIDE_MODAL
  };
}
