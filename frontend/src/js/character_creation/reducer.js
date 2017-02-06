import Immutable from "immutable";
import { ORIGIN } from "../app_const";
import { SET_CHARACTER_CREATION_IMAGE } from "../actions";

const initialState = Immutable.fromJS({
  name: "Nanashi",
  nameJa: "名無し",
  origin: ORIGIN.UNKNOWN,
  imageBlob: null,
});

export default function (state, action) {
  if (typeof state === "undefined") {
    return initialState;
  }

  switch (action.type) {
    case SET_CHARACTER_CREATION_IMAGE:
      state = state.set("imageBlob", action.imageBlob);
      break;
  }

  // For now, don't handle any actions
  // and just return the state given to us.
  return state;
}
