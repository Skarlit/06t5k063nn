import { Provider } from "react-redux";
import { Router, Route } from "react-router";
import Index from "./index";
import NotFound from "./errors/404";

export default (store, history) => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={Index}>
          <Route path="create" getComponents = { (nextState, cb) => {
            require.ensure([], function (require) {
              cb(null, require("./character_creation/index").default);
            });
          }} />
          <Route path="search"  getComponents = { (nextState, cb) => {
            require.ensure([], function (require) {
              cb(null, require("./search/index").default);
            });
          }}  />
          <Route path="mylist" getComponents = { (nextState, cb) => {
            require.ensure([], function (require) {
              cb(null, require("./mylist/index").default);
            });
          }}  />
          <Route path="login" getComponents = { (nextState, cb) => {
            require.ensure([], function (require) {
              cb(null, require("./login/index").default);
            });
          }} />
        </Route>
        <Route path="*" component={NotFound}/>
      </Router>
    </Provider>
  );
};
