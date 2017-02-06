import { select, put, takeLatest } from "redux-saga/effects";
import * as ActionTypes from "./action_types";
import Api from "./api";
import Actions from "./actions";
import * as selectors from "./selectors";


function* getLocaleStrings(localeChangeAction) {
  // if locale doesn't change, do nothing
  const currentLocale = yield select(selectors.getCurrentLocale);
  if (currentLocale == localeChangeAction.locale) {
    return;
  }
  // if locale not in cache, send ajax
  const cache = yield select(selectors.getCachedLanguages);
  const cacheString = cache.get(localeChangeAction.locale);
  let strings;
  if (!cacheString) {
    strings = yield Api.getLocaleStrings(localeChangeAction.locale);
  } else {
    strings = cacheString;
  }
  yield put(Actions.loadStringsAction(strings));
}


export default function* getLocaleStringsWatcher(pattern, saga, args) {
  yield takeLatest(ActionTypes.REQUEST_STRINGS, getLocaleStrings);
}
