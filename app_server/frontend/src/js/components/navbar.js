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
    return (<div className="nav-bar">
          <div className="page-tabs">
            <PageLink href="/" textKey="HOME" />
            <PageLink href="/search" textKey="CHAR_SEARCH_DESCR" />
            <PageLink href="/create" textKey="CHAR_CREATION_DESCR" />
            <PageLink href="/create" textKey="CHAR_CREATION_DESCR" />
          </div>
          <div className="status-wrap">
            <UserStatus
              loggedIn={this.props.loggedIn}
              userName={this.props.userName}
              userImage={this.props.userImage}
            />
          </div>
    </div>);
  }
};

const PageLink = (props) => {
  return <div className="page-link">
            <i className="fa fa-ban" aria-hidden="true"></i>
            <Link to={props.href}><Text textKey={props.textKey} /></Link>
    </div>;
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
