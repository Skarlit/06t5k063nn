import { Link } from "react-router";
import { connect } from "react-redux";
import UserStatus from "./user_status";
import { Text } from "../widgets";

const mapStateToProps = (state, ownProps) => ({
  loggedIn: state.login.getIn(["currentUser", "loggedIn"]),
  userName: state.login.getIn(["currentUser", "name"]),
  userImage: state.login.getIn(["currentUser", "image"])
});
const mapDispatchToProps = dispatch => ({

});

const NavBar = class extends React.Component {
  render () {
    const strings = this.props.strings;
    return (<div className="nav-bar">
      <div className="row user">
        <UserStatus
          loggedIn={this.props.loggedIn}
          userName={this.props.userName}
          userImage={this.props.userImage}
        />
      </div>
      <div className="row pages">
        <Link to="/"><Text textKey="HOME" /></Link>
        <Link to="/search"><Text textKey="CHAR_SEARCH_DESCR" /></Link>
        <Link to="/create"><Text textKey="CHAR_CREATION_DESCR" /></Link>
      </div>
    </div>);
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
