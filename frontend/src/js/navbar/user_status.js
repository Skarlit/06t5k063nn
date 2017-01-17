import {Link } from "react-router";
import Strings from "../strings.js";

export default class UserStatus extends React.Component {
  render() {
    return <div className="user-status">
      <Link to="/login">{Strings.LOGIN}</Link>
      <Link to="/mylist">{Strings.MY_LIST}</Link>
    </div>;
  }
}
