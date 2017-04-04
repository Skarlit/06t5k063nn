import axios from "axios";

export default {
  createCharacter: (characterModel) => {
    let formData = {
      name: characterModel.get("name"),
      name_hira: characterModel.get("nameHira"),
      avatar: characterModel.get("avatar")
    };
    return axios.post("/api/c/create", formData)
    .then((res) => res.data)
    .catch((res) => res);
  }
};
