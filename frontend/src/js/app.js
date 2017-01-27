import { render } from "react-dom";
import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import { browserHistory } from "react-router";
import { syncHistoryWithStore, routerReducer } from "react-router-redux";
import createSagaMiddleware from "redux-saga";
import Routes from "./routes";
import CharacterCreation from "./character_creation";
import Login from "./login";
import Search from "./search";
import Locale from "./locale";
import Utility from "./utility";

let init = () => {

  let rootEl = document.createElement("div");
  document.body.appendChild(rootEl);
    // Add the reducer to your store on the `routing` key
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [sagaMiddleware];

  if (process.env.NODE_ENV !== "production") {
    const createLogger = require("redux-logger");
    const logger = createLogger({
      actionTransformer: (action) => ({
        ...action,
        type: String(action.type)
      }),
      stateTransformer: (state) => {
        for(var k in state) {
          if (state[k].toJS) {
            console.log(k, state[k].toJS());
          } else {
            console.log(k, state[k]);
          }
        }
      }
    });
    middlewares.push(logger);
  }

  Login.init(window.storeData.login);

  let initialState = {};
  for(let key in window.storeData) {
    initialState[key] = Immutable.fromJS(window.storeData[key]);
  }

  const store = createStore(
      combineReducers({
        strings: Locale.reducer,
        login: Login.reducer,
        characterCreation: CharacterCreation.reducer,
        search: Search.reducer,
        endpoints: Utility.nullReducer,
        routing: routerReducer,
      }),
      initialState, // GLOBAL init Store Data
      compose(applyMiddleware(...middlewares))
    );
  sagaMiddleware.run(Locale.sagas);


    // Create an enhanced history that syncs navigation events with the store
  const history = syncHistoryWithStore(browserHistory, store);

  render(Routes(store, history), rootEl);
};


// Entry Point
if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
