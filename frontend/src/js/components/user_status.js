import {Link } from "react-router";
import Locale from "../locale";
import Widigets from "../widgets";
import Utility from "../utility";

const {Image} = Widigets;

export default class UserStatus extends React.Component {
  renderLoggedInUI() {
    let strings = this.props.strings;
    let userImage = Utility.filterHttpUrl(this.props.userImage);
    return <div className="user-status">
      <Image src={userImage} height="30px" width="30px"></Image>
      <div>{this.props.userName}</div>
      <Link to="/mylist">{strings.get("MY_LIST")}</Link>
      <Link to="/logout">{strings.get("LOGOUT")}</Link>
      <Locale.view> </Locale.view>
    </div>;
  }
  renderGuestUI() {
    let strings = this.props.strings;
    return <div className="user-status">
      <Link to="/login">{strings.get("LOGIN")}</Link>
      <Locale.view> </Locale.view>
    </div>;
  }
  render() {
    if (this.props.loggedIn) {
      return this.renderLoggedInUI();
    } else {
      return this.renderGuestUI();
    }
  }
}

UserStatus.propTypes = {
  loggedIn: React.PropTypes.bool,
  userName: React.PropTypes.string,
  strings: React.PropTypes.object
};
