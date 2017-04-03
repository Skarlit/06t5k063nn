import { call, select, put, takeLatest } from "redux-saga/effects";
import Api from "./api";
import { SUBMIT_CHARACTER } from "./duck";
import { getCharacter } from "./selectors";

function* onCharacterSubmit () {
  // if locale doesn't change, do nothing
  const characterModel = yield select(getCharacter);
  const result = yield call(Api.createCharacter, characterModel);
  console.log(result);
  if (result.error) {
    console.log("fail");
  } else {
    console.log(result);
    // yield put(loadStringsAction(strings));
  }
}

export default function* CharacterCreationWatcher () {
  yield takeLatest(SUBMIT_CHARACTER, onCharacterSubmit);
}
