import { logout } from "../api";

export default class LogOut extends React.Component {
  render () {
    logout().then(() => {
      window.location = "/";
    })
    .catch(() => {
      window.location = "/";
      console.warn("logout failed");
    });
    return <div />;
  }
}
