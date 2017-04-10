import { select, put, takeLatest } from "redux-saga/effects";
import Cookie from "js-cookie";
import Api from "./api";
import { loadStringsAction, REQUEST_STRINGS } from "./duck";
import { getCurrentLocale, getCachedLanguages } from "./selectors";
import { killCharacterCache } from "../character/duck";

function* getLocaleStrings (localeChangeAction) {
  // if locale doesn't change, do nothing
  const currentLocale = yield select(getCurrentLocale);
  const newLocale = localeChangeAction.locale;
  if (currentLocale === newLocale) {
    return;
  } else {
    Cookie.set("locale", newLocale, { secure: true });
  }
  // if locale not in cache, send ajax
  const cache = yield select(getCachedLanguages);
  const cacheString = cache.get(localeChangeAction.locale);
  let strings;
  if (!cacheString) {
    strings = yield Api.getLocaleStrings(localeChangeAction.locale);
  } else {
    strings = cacheString;
  }
  yield put(loadStringsAction(strings));
  yield put(killCharacterCache());
}

export default function* getLocaleStringsWatcher () {
  yield takeLatest(REQUEST_STRINGS, getLocaleStrings);
}
