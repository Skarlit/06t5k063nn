import axios from "axios";

export function logout () {
  return axios.delete("/users/sign_out");
}
