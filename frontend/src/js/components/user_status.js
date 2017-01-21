import {Link } from "react-router";
import Locale from "../locale";

export default class UserStatus extends React.Component {
  render() {
    let strings = this.props.strings;
    return <div className="user-status">
      <Link to="/login">{strings.get("LOGIN")}</Link>
      <Link to="/mylist">{strings.get("MY_LIST")}</Link>
      <Locale.view> </Locale.view>
    </div>;
  }
}
