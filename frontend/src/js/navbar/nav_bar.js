import { Link } from "react-router";
import { connect } from "react-redux";

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
    return  <div>
      <div className="row" style={styles.upperBar}>
        <div className="eight columns">BANNNNNNNNNNNER</div>
        <div className="u-pull-right three columns">
          <div>Login / Signup</div>
        </div>
      </div>
      <div className="row" style={styles.bar}>
        <div className="two columns u-pull-right" style={styles.wrap}>
          <Link style={styles.link} to="/search">Search</Link>
        </div>;
      </div>
    </div>;
  }
};

const styles = {
  wrap: {
    textAlign: "center",
    lineHeight: "40px",
    margin: "0 20px"
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "18px",
  },
  upperBar: {
  },
  bar: {
    backgroundColor: "#AE83EA"
  }
};


export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
