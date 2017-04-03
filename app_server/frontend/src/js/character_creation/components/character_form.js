import CharacterAttr from "./character_attr";
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
      <div className="form-body">
        <div className="row">
          <CharacterImageEditor />
          <CharacterAttr />
        </div>
      </div>
    </div>;
  }
}

export default CharacterForm;
