import Immutable from "immutable";
import {ImageCropperModel} from "../models";
export const IMPORT_IMAGE_BLOB = "CHARACTER_CREATION/IMPORT_IMAGE_BLOB";
export const IMAGE_CROPPER_OPEN = "CHARACTER_CREATION/IMAGE_CROPPER_OPEN";
export const IMAGE_CROPPER_CLOSE = "CHARACTER_CREATION/IMAGE_CROPPER_CLOSE";
export const IMAGE_CROPPER_SAVE = "CHARACTER_CREATION/IMAGE_CROPPER_SAVE";

// actionc creator
export function imageCropperOpen (imageBlob) {
  return {
    type: IMAGE_CROPPER_OPEN,
    imageCropperModel: new ImageCropperModel({imageBlob: imageBlob})
  };
}

export function imageCropperSave (croppedImage) {
  return {
    type: IMAGE_CROPPER_SAVE,
    image: croppedImage
  };
}

export function imageCropperClose (currentSession) {
  return {
    type: IMAGE_CROPPER_CLOSE,
    session: currentSession
  };
}

// Session
const initialState = Immutable.fromJS({
  name: "Nanashi",
  nameJa: "名無し",
  ui: {
    imageCropper: false
  },
  session: {
    imageCropper: new ImageCropperModel()
  }
});

export default function (state, action) {
  if (typeof state === "undefined") {
    return initialState;
  }

  switch (action.type) {
  case IMAGE_CROPPER_OPEN:
    state = state.updateIn(["ui", "imageCropper"], () => true);
    state = state.updateIn(["session", "imageCropper"], () => action.imageCropperModel);
    break;
  case IMAGE_CROPPER_CLOSE:
    state = state.updateIn(["ui", "imageCropper"], () => false);
    break;
  case IMAGE_CROPPER_SAVE:
    // state = state;
  }

  // For now, don't handle any actions
  // and just return the state given to us.
  return state;
}
