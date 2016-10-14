import React from "react";
import { render } from "react-dom";
import { createStore, combineReducers } from "redux";
import { browserHistory } from "react-router";
import { syncHistoryWithStore, routerReducer } from "react-router-redux";
import Routes from "./routes";
import CharacterCreationReducer from "./reducers/character_creation_reducer";

window.onload = () => {
  var rootEl = document.createElement("div");
  document.body.appendChild(rootEl);
    // Add the reducer to your store on the `routing` key
  const store = createStore(
      combineReducers({
        characterCreation: CharacterCreationReducer,
        routing: routerReducer,
      })
    );

    // Create an enhanced history that syncs navigation events with the store
  const history = syncHistoryWithStore(browserHistory, store);
  render(Routes(store, history), rootEl);
};
