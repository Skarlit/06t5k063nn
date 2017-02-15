const initialState = Immutable.fromJS({
  0: {
    id: 0,
    avatarImgSrc: require("../../img/test/yukina_test.jpg"),
    name: {
      firstName: {
        kanji: "雪菜",
        jp: "ゆきな",
        en: "Yukina",
      },
      lastName: {
        kanji: "姫柊",
        jp: "ひめらぎ",
        en: "Himeragi",
      },
    },
    profile: {
      age: "14",
      race: "HUMAN",
      gender: "F",
      height: "156cm",
      threeSize: [76, 55, 78], // "B:76/W:55/H:78",
      bloodType: "A",
    },
    cvs: [],
    mediaTypes: [
      { type: "LightNovel", title: "", url: "" },
      { type: "Anime", title: "", url: "" },
    ], // Manga, Eroge, Game, Original, Novel, LightNovel, Anime
    personalities: ["MAJIME"],
    attributes: ["KOUHAI", "JC"],
    description: {
      jp: "",
      en: "",
    },
    features: {
      hair: {
        type: "Semi Long",
        colors: [],
      },
      eyes: {
        eyeShape: "Normal",
        pupilShape: "Round",
        pupilColors: [],
      },
      facialProportion: {

      },
    },
    clothings: {

    },
    weapons: {

    },
    relations: {

    },
  },
});

export default function characterReducer(state = initialState, action) {
  return state;
}
