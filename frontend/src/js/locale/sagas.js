import { select, put, takeLatest } from "redux-saga/effects";
import * as ActionTypes from "./action_types";
import Api from "./api";
import Actions from "./actions";

const getCurrentLocale = state => state.strings.getIn(["currentLanguage", "locale"]);
const getStringCache = state => state.strings.get("cached");

function* getLocaleStrings(localeChangeAction) {
  // if locale doesn't change, do nothing
  const currentLocale = yield select(getCurrentLocale);
  if (currentLocale == localeChangeAction.locale) {
    return;
  }
  // if locale not in cache, send ajax
  const cache = yield select(getStringCache);
  console.log(cache);
  const cacheString = cache.get(localeChangeAction.locale);
  if (!cacheString) {
    const strings = yield Api.getLocaleStrings(localeChangeAction.locale);
  } else {
    const strings = cacheString;
  }
  yield put(Actions.loadStringsAction(strings));
}


export default function* getLocaleStringsWatcher(pattern, saga, args) {
  yield takeLatest(ActionTypes.REQUEST_STRINGS, getLocaleStrings);
}
