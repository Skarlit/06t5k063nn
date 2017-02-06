import { connect } from "react-redux";
import Avatar from "./components/avatar";
import Name from "./components/name";
import { FullNameSelector } from "./selectors";

class Character extends React.Component {
  static state2Prop(state, ownProps) {
    const character = state.characters.get(ownProps.params.characterId);

    return {
      character,
      name: FullNameSelector(character.get("name"), state.language.get("locale")),
    };
  }
  render() {
    console.log(this.props.name);
    const imageUrl = this.props.character.get("avatar_img_src");

    return (<div className="char-content">
      <div className="row">
        <Avatar imageSrc={imageUrl} />
        <Name {...this.props.name} />
      </div>
    </div>);
  }
}


export default connect(Character.state2Prop)(Character);
