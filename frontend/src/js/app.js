import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { Router, Route, browserHistory } from "react-router";
import { syncHistoryWithStore, routerReducer } from "react-router-redux";
import Index from "./containers/index";

window.onload = () => {
    var rootEl = document.createElement("div");
    document.body.appendChild(rootEl);
    // Add the reducer to your store on the `routing` key
    const store = createStore(
      combineReducers({
          routing: routerReducer
      })
    );

    // Create an enhanced history that syncs navigation events with the store
    const history = syncHistoryWithStore(browserHistory, store);

    ReactDOM.render(
      <Provider store={store}>
        { /* Tell the Router to use our enhanced history */ }
        <Router history={history}>
          <Route path="/" component={Index}>
          </Route>
        </Router>
      </Provider>,
      rootEl
    );
};
