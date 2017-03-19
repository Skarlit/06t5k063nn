import { connect } from "react-redux";
import { Text } from "../widgets";
import { getCurrentLocale } from "./selectors";
import { localeChangeAction } from "./duck";
import sagas from "./sagas";

export { sagas as localeSagas };

class LocaleBtn extends React.Component {
  static mapStateToProps (state, props) {
    return {
      locale: getCurrentLocale(state)
    };
  }
  static mapDispatchToProps (dispatch) {
    return {
      selectLocale: locale => dispatch(localeChangeAction(locale))
    };
  }
  constructor (props) {
    super(props);
    this.jaLocale = this.jaLocale.bind(this);
    this.enLocale = this.enLocale.bind(this);
  }
  jaLocale () {
    this.props.selectLocale("ja");
  }
  enLocale () {
    this.props.selectLocale("en");
  }
  render () {
    return (<div className="locale-wrapper">
      <div className="locale-title"><Text textKey="LANGUAGE" /></div>
      <div className="locale-btn">
        <a href="javascript://" className={`item ${this.props.locale === "en" ? "current" : ""}`} onClick={this.enLocale}>
          <div className="icn-en" />
          <div>English</div>
        </a>
        <a href="javascript://" className={`item ${this.props.locale === "ja" ? "current" : ""}`} onClick={this.jaLocale}>
          <div className="icn-jp" />
          <div>日本語</div>
        </a>
      </div>
    </div>);
  }
}

LocaleBtn.propTypes = {
  locale: React.PropTypes.string.isRequired,
  selectLocale: React.PropTypes.func.isRequired
};

export default connect(LocaleBtn.mapStateToProps, LocaleBtn.mapDispatchToProps)(LocaleBtn);
