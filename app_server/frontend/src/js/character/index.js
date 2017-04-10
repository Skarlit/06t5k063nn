import { connect } from "react-redux";
import Avatar from "./components/avatar";
import Name from "./components/name";
import Profile from "./components/profile";
import { getCharacter } from "./selectors";
import { loadCharacter } from "./duck";
import { getCurrentLocale } from "../locale/selectors";

class Character extends React.Component {
  static state2Prop (state, ownProps) {
    const locale = getCurrentLocale(state);
    return {
      character: getCharacter(state, ownProps.params.id),
      locale: locale
    };
  }
  static action2Prop (dispatch) {
    return {
      loadCharacter: (id) => dispatch(loadCharacter(id))
    };
  }
  componentDidUpdate () {
    this.loadCharacter();
  }
  componentDidMount () {
    this.loadCharacter();
  }
  loadCharacter () {
    if (!this.props.character) {
      this.props.loadCharacter(this.props.params.id);
    }
  }
  render () {
    const c = this.props.character;
    if (!c) return null;
    return (<div className="char-content">
      <div className="row">
        <Avatar imageSrc={c.get("avatar")} />
        <div className="panel">
          <Name name={c.get("name")} nameHira={c.get("nameHira")} locale={this.props.locale} />
        </div>
      </div>
    </div>);
  }
}

export default connect(Character.state2Prop, Character.action2Prop)(Character);
