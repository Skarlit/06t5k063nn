import Actions from "./actions";
import { connect } from "react-redux";
import Text from "./components/text";
import { getCurrentLocale } from "../selectors";

class LocaleBtn extends React.Component {
  static mapStateToProps(state, props) {
    return {
      locale: getCurrentLocale(state),
    };
  }
  static mapDispatchToProps(dispatch) {
    return {
      selectLocale: locale => dispatch(Actions.localeChangeAction(locale)),
    };
  }
  render() {
    return (<div className="locale-wrapper">
      <div className="locale-title"><Text textKey="LANGUAGE" /></div>
      <div className="locale-btn">
        <a href="javascript://" className={`item ${this.props.locale == "en" ? "current" : ""}`} onClick={this.props.selectLocale.bind(null, "en")}>
          <div className="icn-en" />
          <div>English</div>
        </a>
        <a href="javascript://" className={`item ${this.props.locale == "jp" ? "current" : ""}`} onClick={this.props.selectLocale.bind(null, "jp")}>
          <div className="icn-jp" />
          <div>日本語</div>
        </a>
      </div>
    </div>);
  }
}

LocaleBtn.propTypes = {
  locale: React.PropTypes.string.isRequired,
  selectLocale: React.PropTypes.func.isRequired,
};


export default connect(LocaleBtn.mapStateToProps, LocaleBtn.mapDispatchToProps)(LocaleBtn);
