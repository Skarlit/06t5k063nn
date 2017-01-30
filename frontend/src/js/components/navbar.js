import { Link } from "react-router";
import { connect } from "react-redux";
import UserStatus from "./user_status";

const mapStateToProps = (state, ownProps) => {
  return {
    strings: state.strings,
    loggedIn: state.login.getIn(["currentUser", "loggedIn"]),
    userName: state.login.getIn(["currentUser", "name"]),
    userImage: state.login.getIn(["currentUser", "image"])
  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

const NavBar = class extends React.Component {
  render() {
    let strings = this.props.strings;
    return  <div className="nav-bar">
      <div className="row user">
        <UserStatus strings={strings}
          loggedIn={this.props.loggedIn}
          userName={this.props.userName}
          userImage={this.props.userImage}/>
      </div>
      <div className="row pages">
          <Link to="/">{strings.get("HOME")}</Link>
          <Link to="/search">{strings.get("CHAR_SEARCH_DESCR")}</Link>
          <Link to="/create">{strings.get("CHAR_CREATION_DESCR")}</Link>
      </div>
    </div>;
  }
};



export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
