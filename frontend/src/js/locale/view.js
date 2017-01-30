import Actions from "./actions";
import {connect} from "react-redux";
import Widgets from "../widgets";

const Text = Widgets.Text;
function mapStateToProps(state, props) {
  return {
    locale: state.strings.get("locale")
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectLocale: (locale) => dispatch(Actions.localeChangeAction(locale))
  };
};

class LocaleBtn extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <div className="locale-wrapper">
      <div className="locale-title"><Text textKey="LANGUAGE"></Text></div>
       <div className="locale-btn">
        <a href="javascript://" className={"item " + (this.props.locale == "en" ? "current" : "")} onClick={this.props.selectLocale.bind(null, "en")}>
          <div className="icn-en"></div>
          <div>English</div>
        </a>
        <a href="javascript://" className={"item " + (this.props.locale == "jp" ? "current" : "")} onClick={this.props.selectLocale.bind(null, "jp")}>
          <div className="icn-jp"></div>
          <div>日本語</div>
        </a>
      </div>
    </div>;
  }
}

LocaleBtn.propTypes = {
  locale: React.PropTypes.string.isRequired,
  selectLocale: React.PropTypes.func.isRequired
};


export default connect(mapStateToProps, mapDispatchToProps)(LocaleBtn);
