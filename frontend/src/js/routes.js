import { Provider } from "react-redux";
import { Router, Route } from "react-router";
import Index from "./index";
import NotFound from "./errors/404";
import Login from "./login";
import Character from "./character";

export default (store, history) => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={Index}>
          <Route path="create" getComponents = { (nextState, cb) => {
            require.ensure([], function (require) {
              cb(null, require("./character_creation").default.view);
            });
          }} />
          <Route path="search"  getComponents = { (nextState, cb) => {
            require.ensure([], function (require) {
              cb(null, require("./search").default.view);
            });
          }}  />
          <Route path="mylist" getComponents = { (nextState, cb) => {
            require.ensure([], function (require) {
              cb(null, require("./mylist").default.view);
            });
          }}  />
          <Route path="character/:characterId" component={Character.view} />
          <Route path="/login" component={Login.view}/>
          <Route path="/logout" component={Login.Logout}/>
        </Route>
        <Route path="*" component={NotFound}/>
      </Router>
    </Provider>
  );
};
