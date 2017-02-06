import { connect } from "react-redux";
import { getText } from "../../selectors";

class Text extends React.Component {
  static mapStateToProps(state, props) {
    return {
      text: getText(state, props.textKey),
    };
  }
  render() {
    let classNames = "text ";
    if (this.props.className) classNames += this.props.className;
    return (<div className={classNames}>
      {this.props.text}
    </div>);
  }
}

Text.propTypes = {
  className: React.PropTypes.string,
  textKey: React.PropTypes.string.isRequired,
};

export default connect(Text.mapStateToProps)(Text);
