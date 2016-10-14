import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router, Route } from "react-router";
import Index from "./containers/index.js";
import CharacterCreater from "./containers/widgets/character_creater";
import NotFound from "./components/errors/not_found";

export default (store, history) => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={Index}>
          <Route path="create" component={CharacterCreater} />
        </Route>
        <Route path="*" component={NotFound}/>
      </Router>
    </Provider>
  );
};
