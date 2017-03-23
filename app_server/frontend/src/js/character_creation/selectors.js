import { createSelector } from "reselect";

export const getSession = state => state.characterCreation.get("session");

export const getUIState = state => state.characterCreation.get("ui");

export const getCharacterSession = createSelector(getSession, (session) => {
  return session.get("characterSession");
});

export const getCharacter = createSelector(getCharacterSession, (characterSession) => {
  return characterSession.get("character");
});

export const getCharacterImageCropperSession = createSelector(getCharacterSession, (character) => {
  return character.get("imageCropper");
});
