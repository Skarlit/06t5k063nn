import { createSelector } from "reselect";

export const getSession = state => state.characterCreation.get("session");
export const getImageCropperModel = createSelector(getSession, (session) => {
  return session.get("imageCropper");
});
