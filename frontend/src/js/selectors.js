
// LOCALE
export const getCurrentLocale = state => state.language.getIn(["current", "locale"]);
export const getCurrentLanguageString = state => state.language.get("current");
export const getCachedLanguages = state => state.language.get("cached");
export const getText = (state, key) => state.language.getIn(["current", key]);


// CHARACTERS
export const getFullName = (state, props) => {
  const { id, locale } = props;
  const name = state.characters.getIn([id, "name"]);
  return {
    firstName: {
      kanji: name.getIn(["firstName", "kanji"]),
      yomi: name.getIn(["firstName", locale]),
    },
    lastName: {
      kanji: name.getIn(["lastName", "kanji"]),
      yomi: name.getIn(["lastName", locale]),
    },
  };
};

export const getAvartarData = (state, props) => {
  const { id } = props;
  return {
    imageSrc: state.characters.getIn([id, "avatarImgSrc"]),
  };
};

export const getProfile = (state, props) => {
  const { id } = props;
  const profile = state.characters.getIn([id, "profile"]);
  const strings = getCurrentLanguageString(state);
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
    bloodType: profile.get("bloodType"),
  };
};
