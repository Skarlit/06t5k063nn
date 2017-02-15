import { put, takeLatest } from "redux-saga/effects";
import { goBack } from "react-router-redux";
import { USER_LOGIN } from "./duck";

function* onLoginSuccess() {
  yield put(goBack());
}

export default function* saga() {
  yield takeLatest(USER_LOGIN, onLoginSuccess);
}
