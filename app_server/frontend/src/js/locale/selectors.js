import { createSelector } from "reselect";

// LOCALE
export const getCurrentLocale = state => state.language.getIn(["current", "locale"]);
export const getCurrentLanguageString = state => state.language.get("current");
export const getCachedLanguages = state => state.language.get("cached");
export const getText = (state, key) => state.language.getIn(["current", key]);
