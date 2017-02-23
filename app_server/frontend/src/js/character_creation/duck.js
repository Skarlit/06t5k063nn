import Immutable from "immutable";
import {ImageCropperModel} from "../models";
export const IMPORT_IMAGE_BLOB = "CHARACTER_CREATION/IMPORT_IMAGE_BLOB";

// Session
const initialState = Immutable.fromJS({
  name: "Nanashi",
  nameJa: "名無し",
  session: {
    imageCropper: new ImageCropperModel()
  }
});

export default function (state, action) {
  if (typeof state === "undefined") {
    return initialState;
  }

  switch (action.type) {
  case IMPORT_IMAGE_BLOB:
    state = state.updateIn(["session", "imageCropper"], () => action.image);
    break;
  }

  // For now, don't handle any actions
  // and just return the state given to us.
  return state;
}
