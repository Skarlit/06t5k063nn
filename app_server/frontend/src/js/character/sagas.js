import { put, call, takeLatest } from "redux-saga/effects";
import { loadCharacter } from "./api";
import { LOAD_CHARACTER, setCharacter } from "./duck";
import { Character } from "../models";

function* loadCharacterAjax (loadCharAction) {
  const result = yield call(loadCharacter, loadCharAction.id);
  if (result.status == 200) {
    const model = new Character(result.data);
    yield put(setCharacter(model));
  }
}

export default function* loadCharacterWatcher () {
  yield takeLatest(LOAD_CHARACTER, loadCharacterAjax);
}

