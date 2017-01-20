import { Link } from "react-router";
import { connect } from "react-redux";
import UserStatus from "./user_status";

const mapStateToProps = (state, ownProps) => {
  return {
    strings: state.strings

  };
};

const mapDispatchToProps = (dispatch) => {
  return {

  };
};

const NavBar = class extends React.Component {
  render() {
    let strings = this.props.strings;
    return  <div id="nav-bar">
      <div className="row">
        <UserStatus strings={strings} />
      </div>
      <div className="row">
          <Link to="/">{strings.get("HOME")}</Link>
          <Link to="/search">{strings.get("CHAR_SEARCH_DESCR")}</Link>
          <Link to="/create">{strings.get("CHAR_CREATION_DESCR")}</Link>
      </div>
    </div>;
  }
};



export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
