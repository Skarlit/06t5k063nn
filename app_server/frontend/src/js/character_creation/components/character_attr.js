import { connect } from "react-redux";
import { setCharacterAttr, submitCharacter } from "../duck";
import { getCharacterName, getCharacterNameHira } from "../selectors";
import { FluxInput, Text, Button } from "../../widgets";

class CharacterAttr extends React.Component {
  static mapState2Props (state) {
    return {
      name: getCharacterName(state),
      nameHira: getCharacterNameHira(state)
    };
  }
  static mapAction2Props (dispatch) {
    return {
      updateName: (value) => {
        console.log(value);
        dispatch(setCharacterAttr("name", value));
      },
      updateNameHira: (value) => {
        dispatch(setCharacterAttr("nameHira", value));
      },
      submitCharacter: () => dispatch(submitCharacter())
    };
  }
  render () {
    return <div>
      <label><Text textKey="NAME" />
        <FluxInput onChange={this.props.updateName} value={this.props.name} />
      </label>
      <label><Text textKey="NAME_HIRA" />
        <FluxInput onChange={this.props.updateNameHira} value={this.props.nameHira} />
      </label>
      <Button onClick={this.props.submitCharacter} type="confirm">Create</Button>
    </div>;
  }
}

export default connect(
  CharacterAttr.mapState2Props,
  CharacterAttr.mapAction2Props)(CharacterAttr);
