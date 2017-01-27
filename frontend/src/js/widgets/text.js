import {connect} from "react-redux";

function mapStateToProps(state, props) {
  return {
    strings: state.strings
  };
}

class Text extends React.Component {
  render() {
    return <div className={"text " + (this.props.className || "")}>
      {this.props.strings.get(this.props.textKey)}
    </div>;
  }
}

Text.propTypes = {
  className: React.PropTypes.string,
  textKey: React.PropTypes.string.isRequired
};

export default connect(mapStateToProps)(Text);
