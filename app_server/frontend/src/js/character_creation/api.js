import axios from "axios";
import { base64ToPng } from "../utility";

export default {
  createCharacter: (characterModel) => {
    let data = characterModel.toJS();
    data.avatar = base64ToPng(data.avatar);
    return axios.post("/api/c/create", data);
  }
};
