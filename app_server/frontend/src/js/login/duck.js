
export const USER_LOGIN = "LOGIN/LOGIN";
export const USER_LOGIN_FAIL = "LOGIN/LOGIN_FAIL";
export const DELETE_USER_SESSION = "LOGIN/DELETE_USER_SESSION";

export const SHOW_MODAL = "LOGIN/SHOW_MODAL";
export const HIDE_MODAL = "LOGIN/HIDE_MODAL";

export function loginViaFacebook (user) {
  return {
    type: USER_LOGIN,
    user
  };
}

export function deleteUserSession () {
  return {
    type: DELETE_USER_SESSION
  };
}

export function showModal () {
  return {
    type: SHOW_MODAL
  };
}

export function hideModal () {
  return {
    type: HIDE_MODAL
  };
}

const initialState = Immutable.Map();
export default function (state = initialState, action) {
  let newState = state;
  switch (action.type) {
  case USER_LOGIN: {
    newState = state.update("currentUser", () => Immutable.fromJS(action.user));
    break;
  }

  case DELETE_USER_SESSION: {
    newState = state.update("currentUser", () => Immutable.Map());
    break;
  }
  default:
  }
  return newState;
}
