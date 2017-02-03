let initialState = Immutable.fromJS({
  0: {
    id: 0,
    avatar_img_src: require("../../img/test/yukina_test.jpg"),
    name: "姫柊雪菜",
    name_pronounce: "ひめらぎ　ゆきな",
    name_romaji: "Himeragi Yukina",
    kind: "human",
    female: true,
    height: "156cm",
    three_size: "B:76(C60)/W:55/H:78",
    blood_type: "A",
    cvs: [],
    media_types: [
      {type: "LightNovel", title: "", url: ""},
      {type: "Anime", title: "", url: ""},
    ], // Manga, Eroge, Game, Original, Novel, LightNovel, Anime
    personalities: [],
    attributes: [],
    description: {
      jp: "",
      en: ""
    },
    age: "14",
    features: {
      hair: {
        type: "Semi Long",
        colors: []
      },
      eyes: {
        shape: "Normal",
        pupil: "Round",
        pupil_colors: [],
      },
      facial_proportion: {

      }
    },
    clothings: {

    },
    weapons: {

    },
    relations: {

    }
  }
});

export default function characterReducer(state=initialState, action) {

  return state;
}
