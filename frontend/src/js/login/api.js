import axios from "axios";
import Utility from "../utility";

export function logout () {
  let header = {"X-CSRF-Token": Utility.getCSRFToken()};
  return axios.delete("/users/sign_out", { headers: header });
}
