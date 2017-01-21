import Actions from "./actions";
import {connect} from "react-redux";

function mapStateToProps(state, props) {
  return {
    locale: state.strings.get("locale")
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLocalChanged: (e) => dispatch(Actions.localeChangeAction(e.target.value))
  };
};


class LocaleBtn extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div>
      <select name="select" onChange={this.props.onLocalChanged} value={this.props.locale}>
        <option value="en">English</option>
        <option value="jp">日本語</option>
      </select>
    </div>;
  }
}

LocaleBtn.propTypes = {
  locale: React.PropTypes.string.isRequired,
  onLocalChanged: React.PropTypes.func.isRequired
};


export default connect(mapStateToProps, mapDispatchToProps)(LocaleBtn);
