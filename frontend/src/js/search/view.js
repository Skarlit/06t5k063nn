import { connect } from "react-redux";

const mapStateToProps = (state, ownProps) => {
  return {
    strings: state.strings
  };
};

const mapDispatchToProps = (state, ownProps) => {
  return {

  };
};


class Search extends React.Component {
  render() {
    let strings = this.props.strings;
    return <div className="pure-form">
      {strings.get("CHAR_SEARCH_DESCR")}
      <div className="input-wrap"><input /></div>
      <div className="option-wrap">
        <div className="options">
          {strings.get("CHAR_SEARCH_OPTION")}
        </div>
      </div>
      <div>
        {strings.get("CHAR_SEARCH_RESULT")}
        <ul>
            <li> {strings.get("CHAR_SEARCH_RESULT")} 1</li>
            <li> {strings.get("CHAR_SEARCH_RESULT")} 2</li>
            <li> {strings.get("CHAR_SEARCH_RESULT")} 3</li>
        </ul>
      </div>
    </div>;
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
