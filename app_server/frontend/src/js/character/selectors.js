import { createSelector } from "reselect";
import { getCurrentLanguageString, getCurrentLocale } from "../locale/selectors";

// CHARACTERS
export const getAvartarData = (state, props) => {
  const { id } = props;
  return {
    imageSrc: state.characters.getIn([id, "avatar"])
  };
};

export const getCharacter = (state, props) => {
  const { id } = props;
  return state.characters.get(id);
};

export const getFullName = createSelector(
  getCharacter,
  getCurrentLocale,
  (character, locale) => {
    const name = character.get("name");
    return {
      firstName: {
        kanji: name.getIn(["firstName", "kanji"]),
        yomi: name.getIn(["firstName", locale])
      },
      lastName: {
        kanji: name.getIn(["lastName", "kanji"]),
        yomi: name.getIn(["lastName", locale])
      } };
  });

export const getProfile = createSelector(
  getCharacter,
  getCurrentLanguageString,
  (character, strings) => {
    const profile = character.get("profile");
    let threeSize = [];
    if (profile.get("threeSize")) {
      threeSize = profile.get("threeSize").toJS();
    }
    return {
      age: profile.get("age"),
      race: strings.get(profile.get("race")),
      gender: profile.get("gender"),
      height: profile.get("height"),
      threeSize,
      bloodType: profile.get("bloodType")
    };
  });

// export const getFeatures = createSelector(
//   getCharacter,
//   (character) => {
//     const features = character.get("features");
//     return {
//       hairType: features.getIn(["hair", "type"]),
//       hairColor: features.getIn(["hair", "colors"]),
//       eyeShape: features.getIn()
//     };
//   },
// );
