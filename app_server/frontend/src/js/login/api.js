import axios from "axios";
import Utility from "../utility";

export function logout () {
  const header = { "X-CSRF-Token": Utility.getCSRFToken() };
  return axios.delete("/users/sign_out", { headers: header });
}
