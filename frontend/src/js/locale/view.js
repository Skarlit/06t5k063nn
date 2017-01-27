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

const locales = ["en", "jp"];
class LocaleBtn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {toggled: false};
    this.toggleMenu = this.toggleMenu.bind(this);
  }
  toggleMenu() {
    this.setState({toggled: true});
  }
  renderSelected(locale) {
    return <div className={`selected icn-${locale}`} onClick={this.toggleMenu}></div>;
  }
  renderLocaleItem(locale) {
    switch(locale) {
    case "en":
      return <div className="item" value="en">English<div className="icn-en"></div></div>;
    case "jp":
      return <div className="item" value="jp">日本語<div className="icn-jp"></div></div>;
    }
  }
  render() {
    let items = [];
    for (var i = 0; i < locales.length; i++) {
      if (locales[i] != this.props.locale) items.push(this.renderLocaleItem(locales[i]));
    }
    return <div className="locale-btn">
      {this.renderSelected(this.props.locale)}
      <div className={"menu " + (this.state.toggled ? "toggled" : "")}>
        {items}
      </div>
    </div>;
  }
}

LocaleBtn.propTypes = {
  locale: React.PropTypes.string.isRequired,
  onLocalChanged: React.PropTypes.func.isRequired
};


export default connect(mapStateToProps, mapDispatchToProps)(LocaleBtn);
