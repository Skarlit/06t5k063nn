import { put, takeLatest } from  "redux-saga/effects";
import * as ActionTypes from "./action_types";
import Api from "./api";
import Actions from "./actions";

function* getLocaleStrings(action) {
  let strings = yield Api.getLocaleStrings(action.locale);
  yield put(Actions.loadStringsAction(strings));
}


export default function* getLocaleStringsWatcher(pattern, saga, args) {
  yield takeLatest(ActionTypes.REQUEST_STRINGS, getLocaleStrings);
}
