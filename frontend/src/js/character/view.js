import Avatar from "./components/avatar";
import { connect } from "react-redux";

class Character extends React.Component {
  static state2Prop(state, ownProps) {
    let character = state.characters.get(ownProps.params.characterId);
    return {
      character: character
    };
  }
  render() {
    console.log(this.props);
    const imageUrl = this.props.character.get("avatar_img_src");
    return <div className="char-content">
      <div className="row">
        <Avatar imageSrc={imageUrl} />
      </div>
    </div>;
  }
}


export default connect(Character.state2Prop)(Character);
