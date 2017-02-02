import { call, put, takeLatest } from "redux-saga/effects";
import { goBack } from "react-router-redux";
import * as ActionTypes from "./action_types";

function* onLoginSuccess() {
  yield put(goBack());
}

export default function* saga() {
  yield takeLatest(ActionTypes.USER_LOGIN, onLoginSuccess);
}
