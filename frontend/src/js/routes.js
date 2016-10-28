import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router, Route } from "react-router";
import Index from "./pages/index.js";
import CharacterCreater from "./character_creation/character_creater";
import Search from "./pages/search_page";
import NotFound from "./pages/not_found";

export default (store, history) => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={Index}>
          <Route path="create" component={CharacterCreater} />
          <Route path="search" component={Search} />
        </Route>
        <Route path="*" component={NotFound}/>
      </Router>
    </Provider>
  );
};
