import { connect } from "react-redux";
import Avatar from "./components/avatar";
import Name from "./components/name";
import Profile from "./components/profile";
import { getCharacter } from "./selectors";
import { loadCharacter } from "./duck";

class Character extends React.Component {
  static state2Prop (state, ownProps) {
    return {
      character: getCharacter(state, { id: ownProps.params.id })
    };
  }
  static action2Prop (dispatch) {
    return {
      loadCharacter: (id) => dispatch(loadCharacter(id))
    };
  }
  componentDidMount () {
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
          <div> {c.get("name")} </div>
        </div>
      </div>
    </div>);
  }
}

export default connect(Character.state2Prop, Character.action2Prop)(Character);
