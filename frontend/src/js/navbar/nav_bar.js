import { Link } from "react-router";
import { connect } from "react-redux";
import Strings from "../strings";
import UserStatus from "./user_status";

const mapStateToProps = (state, ownProps) => {
  return {

  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

const NavBar = class extends React.Component {
  render() {
    return  <div id="nav-bar">
      <div className="row">
        <UserStatus />
      </div>
      <div className="row">
          <Link to="/">{Strings.HOME}</Link>
          <Link to="/search">{Strings.CHAR_SEARCH_DESCR}</Link>
          <Link to="/create">{Strings.CHAR_CREATION_DESCR}</Link>
      </div>
    </div>;
  }
};



export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
