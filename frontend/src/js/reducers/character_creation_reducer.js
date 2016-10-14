import Immutable from "immutable";
import {ORIGIN} from "../app_const";

const initialState = Immutable.fromJS({
  name: "Nanashi",
  nameJa: "名無し",
  origin: ORIGIN.UNKNOWN
});

export default function (state, action) {
  if (typeof state === "undefined") {
    return initialState;
  }

  // For now, don't handle any actions
  // and just return the state given to us.
  return state;
}
