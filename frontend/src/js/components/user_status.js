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
      <Link to="/mylist">{strings.get("MY_LIST")}
        <i className="fa fa-th-list" aria-hidden="true"></i>
      </Link>
      <Link to="/logout">
        {strings.get("LOGOUT")}
        <i className="fa fa-sign-out" aria-hidden="true"></i>
      </Link>
      <div className="user-name">{this.props.userName}</div>
      <Image src={userImage} className="user-icon"></Image>
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
