import { createSelector } from "reselect";

export const NameSelector = (name, props) => ({
  kanji: name.get("kanji"),
  yomi: name.get(props.locale),
});


export const FullNameSelector = (
  NameSelector, NameSelector,
  (firstName, lastName) => ({
    firstName,
    lastName,
  }));
