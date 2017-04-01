// import { connect } from "react-redux";
// import { imageCropperLoadCharacter, imageCropperClose, setCharacterFormImage } from "../duck";
// import { getCharacterImageCropperSession, getCharacter, getUIState, getCharacterAvatarImage } from "../selectors";
import { FormInput } from "../../widgets/";
import CharacterImageEditor from "./character_image_editor";

class CharacterForm extends React.Component {
  constructor (props) {
    super(props);
    this.validate = this.validate.bind(this);
  }
  validate (e) {

  }
  render () {
    return <div><h2>Character Form</h2>
      <CharacterImageEditor />
      <label>Name
      </label>
    </div>;
  }
}

export default CharacterForm;
