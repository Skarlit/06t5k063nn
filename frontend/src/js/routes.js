import { Provider } from "react-redux";
import { Router, Route } from "react-router";
import Index from "./pages/index.js";
import CharacterCreation from "./pages/character_creation";
import Search from "./pages/search_page";
import MyList from "./pages/mylist";
import Login from "./pages/login";
import NotFound from "./pages/not_found";

export default (store, history) => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={Index}>
          <Route path="create" component={CharacterCreation} />
          <Route path="search" component={Search} />
          <Route path="mylist" component={MyList} />
          <Route path="login" component={Login} />
        </Route>
        <Route path="*" component={NotFound}/>
      </Router>
    </Provider>
  );
};
