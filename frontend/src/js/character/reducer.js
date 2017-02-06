const initialState = Immutable.fromJS({
  0: {
    id: 0,
    avatar_img_src: require("../../img/test/yukina_test.jpg"),
    name: {
      first_name: {
        kanji: "雪菜",
        jp: "ゆきな",
        en: "Yukina",
      },
      last_name: {
        kanji: "姫柊",
        jp: "ひめらぎ",
        en: "Himeragi",
      },
    },
    bio: {
      age: "14",
      race: "human",
      female: true,
      height: "156cm",
      three_size: "B:76/W:55/H:78",
      blood_type: "A",
    },
    cvs: [],
    media_types: [
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
        shape: "Normal",
        pupil: "Round",
        pupil_colors: [],
      },
      facial_proportion: {

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
