import { render } from "react-dom";
import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import { browserHistory } from "react-router";
import { syncHistoryWithStore, routerReducer } from "react-router-redux";
import thunk from "redux-thunk";
import Routes from "./routes";
import CharacterCreationReducer from "./character_creation/character_creation_reducer";
import SearchReducer from "./search/search_reducer";

require("../css/app.scss");

window.onload = () => {
  var rootEl = document.createElement("div");
  document.body.appendChild(rootEl);
    // Add the reducer to your store on the `routing` key

  const middlewares = [thunk];

  if (process.env.NODE_ENV !== "production") {
    const createLogger = require("redux-logger");
    const logger = createLogger({
      actionTransformer: (action) => ({
        ...action,
        type: String(action.type)
      })
    });
    middlewares.push(logger);
  }

  const store = createStore(
      combineReducers({
        characterCreation: CharacterCreationReducer,
        search: SearchReducer,
        routing: routerReducer,
      }),
      compose(applyMiddleware(...middlewares))
    );

    // Create an enhanced history that syncs navigation events with the store
  const history = syncHistoryWithStore(browserHistory, store);

  render(Routes(store, history), rootEl, () => {
    FB.getLoginStatus(function(response) {
      if (response.status === "connected") {
        console.log("Logged in.");
      }
      else {
        FB.login();
      }
    });
  });
};
