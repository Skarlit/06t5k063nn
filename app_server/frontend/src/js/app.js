import { render } from "react-dom";
import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import { browserHistory } from "react-router";
import { routerMiddleware, syncHistoryWithStore, routerReducer } from "react-router-redux";
import createSagaMiddleware from "redux-saga";
import Routes from "./routes";
import { nullReducer } from "./utility";
import CharacterCreationReducer from "./character_creation/duck";
import LoginReducer from "./login/duck";
import SearchReducer from "./search/duck";
import CharacterReducer from "./character/duck";
import LocaleReducer from "./locale/duck";
import { loginInit, loginSagas } from "./login";
import { localeSagas } from "./locale";

const init = () => {
  const rootEl = document.createElement("div");
  document.body.appendChild(rootEl);
    // Add the reducer to your store on the `routing` key
  const sagaMiddleware = createSagaMiddleware();

  const historyMiddleware = routerMiddleware(browserHistory);
  const middlewares = [historyMiddleware, sagaMiddleware];

  if (process.env.NODE_ENV !== "production") {
    const createLogger = require("redux-logger");
    const logger = createLogger({
      actionTransformer: action => ({
        ...action,
        type: String(action.type)
      })
    });
    middlewares.push(logger);
  }

  loginInit(window.storeData.login);

  const initialState = {};
  // TODO: Compose data;
  for (const key in window.storeData) {
    initialState[key] = Immutable.fromJS(window.storeData[key]);
  }

  const store = createStore(
      combineReducers({
        language: LocaleReducer,
        login: LoginReducer,
        characterCreation: CharacterCreationReducer,
        search: SearchReducer,
        endpoints: nullReducer,
        characters: CharacterReducer,
        routing: routerReducer
      }),
      initialState, // GLOBAL init Store Data
      compose(applyMiddleware(...middlewares)),
    );
  sagaMiddleware.run(localeSagas);
  sagaMiddleware.run(loginSagas);

    // Create an enhanced history that syncs navigation events with the store
  const history = syncHistoryWithStore(browserHistory, store);

  render(Routes(store, history), rootEl);
};

// Entry Point
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
