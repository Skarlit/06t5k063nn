export const SET_CHARACTER_CREATION_IMAGE = "SET_CHARACTER_CREATION_IMAGE";
export const setCharacterCreationImage = (imageBlob) => {
  return {type: SET_CHARACTER_CREATION_IMAGE, imageBlob: imageBlob};
};
