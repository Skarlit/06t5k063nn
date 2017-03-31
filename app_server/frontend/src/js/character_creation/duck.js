import Immutable from "immutable";
import {ImageCropperModel, Character } from "../models";
export const IMPORT_IMAGE_BLOB = "CHARACTER_CREATION/IMPORT_IMAGE_BLOB";
export const SET_CHAR_IMAGE = "CHARACTER_CREATION/SET_CHAR_IMAGE";
export const IMAGE_CROPPER_CLOSE = "CHARACTER_CREATION/IMAGE_CROPPER_CLOSE";
export const IMG_CROPPER_LOAD_CHAR = "CHARACTER_CREATION/IMG_CROPPER_LOAD_CHAR";

// actionc creator
export function imageCropperClose (currentSession) {
  return {
    type: IMAGE_CROPPER_CLOSE
  };
}

export function imageCropperLoadCharacter (imageBlob, imageBaseWidth, imageBaseHeight) {
  return {
    type: IMG_CROPPER_LOAD_CHAR,
    imageCropperModel: new ImageCropperModel({
      imageBlob: imageBlob,
      imageBaseWidth: imageBaseWidth,
      imageBaseHeight: imageBaseHeight})
  };
}

export function setCharacterFormImage (croppedImage) {
  return {
    type: SET_CHAR_IMAGE,
    croppedImage: croppedImage
  };
}

// State schema
const initialState = Immutable.fromJS({
  ui: {
    imageCropper: false
  },
  session: {
    characterSession: {
      imageCropper: new ImageCropperModel(),
      character: new Character()
    },
    seiyuu: {

    },
    medium: {

    }
  }
});

export default function (state, action) {
  if (typeof state === "undefined") {
    return initialState;
  }

  switch (action.type) {
  case IMAGE_CROPPER_CLOSE:
    state = state.updateIn(["ui", "imageCropper"], () => false);
    break;
  case SET_CHAR_IMAGE:
    // state = state;
    break;
  case IMG_CROPPER_LOAD_CHAR:
    state = state.updateIn(["session", "characterSession", "imageCropper"], () => action.imageCropperModel);
    state = state.updateIn(["ui", "imageCropper"], () => true);
  }

  // For now, don't handle any actions
  // and just return the state given to us.
  return state;
}
