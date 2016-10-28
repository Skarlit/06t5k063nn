import { connect } from "react-redux";

const mapStateToProps = (state, ownProps) => {
  console.log(state);
  return {
  };
};

const mapDispatchToProps = (state, ownProps) => {
  return {

  };
};


class Search extends React.Component {
  render() {
    return <div className="pure-form"> Search
    </div>;
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
