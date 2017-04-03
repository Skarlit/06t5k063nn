import { connect } from "react-redux";
import axios from "axios";
import ResultEntry from "./components/result_entry";

const mapStateToProps = (state, ownProps) => ({
  strings: state.language.get("current")
});

const mapDispatchToProps = (state, ownProps) => ({

});

class Search extends React.Component {
  constructor (props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = {searchResults: []};
  }
  filter (str) {
    return str;
  }
  onChange (e) {
    const searchString = this.filter(e.target.value);
    axios.get(`/api/search/char?q=${searchString}`).then((response) => {
      this.setState({searchResults: response.data});
    }).catch((error) => {
      console.log(error);
    });
  }
  render () {
    const strings = this.props.strings;
    let results = [];
    for (let i = 0; i < this.state.searchResults.length; i++) {
      results.push(<ResultEntry key={"result-" + i} result = {this.state.searchResults[i]} />);
    }
    return (<div className="pure-form">
      {strings.get("CHAR_SEARCH_DESCR")}
      <div className="input-wrap">
        <input type="text" onChange={this.onChange} placeholder="Search here ..." />
      </div>
      <div className="option-wrap">
        <div className="options">
          {strings.get("CHAR_SEARCH_OPTION")}
        </div>
      </div>
      <div>
        {strings.get("CHAR_SEARCH_RESULT")}
        <ul>
          {results}
        </ul>
      </div>
    </div>);
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search);
