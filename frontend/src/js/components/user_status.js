import {Link } from "react-router";
import Widigets from "../widgets";
import Utility from "../utility";

const {Image} = Widigets;

export default class UserStatus extends React.Component {
  constructor(props) {
    super(props);
    this.state = {toggled: false};
    this.toggle = this.toggle.bind(this);
    this.close = this.close.bind(this);
  }
  shouldComponentUpdate(nextProps, nextState) {
    return nextState.toggled != this.state.toggled || nextProps.loggedIn != this.props.loggedIn;
  }
  toggle() {
    this.setState({toggled: !this.state.toggled});
  }
  close() {
    this.setState({toggled: false});
  }
  renderMenuItem(string, glpyh, link, key) {
    return <Link key={key} to={link}>{string}
      <i className={glpyh} aria-hidden="true"></i>
    </Link>;
  }
  renderLoggedInUI() {
    let strings = this.props.strings;
    let userImage = Utility.filterHttpUrl(this.props.userImage);

    let menuItems = [
      this.renderMenuItem(strings.get("MY_LIST"), "fa fa-th-list", "/mylist", "user-status-mylist"),
      this.renderMenuItem(strings.get("PROFILE"), "fa fa-user", "/profile", "user-status-profile"),
      this.renderMenuItem(strings.get("SETTING"), "fa fa-cog", "/profile/setting", "user-status-setting"),
      this.renderMenuItem(strings.get("LOGOUT"), "fa fa-sign-out", "/logout", "user-status-logout")
    ];
    return <div className="user-status">
      <div className={"menu " + (this.state.toggled ? "toggled" : "")}>
        <div className="slider">
          {menuItems}
        </div>
      </div>
      <div className="backdrop" onClick={this.close}></div>
      <a href="javascript://" className="status" onClick={this.toggle}>
        <div className="user-name">{this.props.userName}</div>
        <Image src={userImage} className="user-icon"></Image>
      </a>
    </div>;
  }
  renderGuestUI() {
    let strings = this.props.strings;
    return <div className="user-status">
        <Link className="btn login-btn" to="/login" >{strings.get("LOGIN")}</Link>
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
