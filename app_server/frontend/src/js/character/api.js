import axios from "axios";

export const loadCharacter = (id) => {
  return axios.get(`/api/c/${id}`).then((result) => result).catch((result) => result);
};
