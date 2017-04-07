import { Provider } from "react-redux";
import { Router, Route } from "react-router";
import Index from "./index";
import NotFound from "./errors/404";
import Login from "./login";
import Logout from "./login/components/logout"; // TODO: Fix this
import Character from "./character";

export default (store, history) => (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={Index}>
        <Route
          path="create" getComponents={(nextState, cb) => {
            require.ensure([], (require) => {
              cb(null, require("./character_creation").default);
            });
          }}
        />
        <Route
          path="search" getComponents={(nextState, cb) => {
            require.ensure([], (require) => {
              cb(null, require("./search").default);
            });
          }}
        />
        <Route
          path="mylist" getComponents={(nextState, cb) => {
            require.ensure([], (require) => {
              cb(null, require("./mylist").default);
            });
          }}
        />
        <Route path="char/:id(/:characterName)" component={Character} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
      </Route>
      <Route path="*" component={NotFound} />
    </Router>
  </Provider>
  );
