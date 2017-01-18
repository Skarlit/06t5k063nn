import { connect } from "react-redux";
import Strings from "../strings";

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
    return <div className="pure-form">
      {Strings.CHAR_SEARCH_DESCR}
      <div className="input-wrap"><input /></div>
      <div className="option-wrap">
        <div className="options">
          {Strings.CHAR_SEARCH_OPTION}
        </div>
      </div>
      <div>
        {Strings.CHAR_SEARCH_RESULT}
        <ul>
            <li> {Strings.CHAR_SEARCH_RESULT} 1</li>
            <li> {Strings.CHAR_SEARCH_RESULT} 2</li>
            <li> {Strings.CHAR_SEARCH_RESULT} 3</li>
        </ul>
      </div>
    </div>;
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
