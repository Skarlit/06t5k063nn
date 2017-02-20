import LoginMenu from "./components/login_menu";
import Logout from "./components/logout";
import init from "./init";
import sagas from "./sagas";

export { Logout, init as loginInit, sagas as loginSagas };


export default () => (<div>
  <LoginMenu />
</div>);
