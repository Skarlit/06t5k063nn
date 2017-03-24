import { connect } from "react-redux";
import { imageCropperOpen, imageCropperSave, imageCropperClose } from "../duck";
import { getCharacterImageCropperSession, getCharacter, getUIState } from "../selectors";
import { FormInput, ImageImport, FileInput, Avatar } from "../../widgets/";

const noop = () => {};

class CharacterForm extends React.Component {
  static mapStateToProps (state, ownProps) {
    return {
      characterModel: getCharacter(state),
      imageCropperModel: getCharacterImageCropperSession(state),
      imageCropperVisible: getUIState(state).get("imageCropper")
    };
  }
  static mapDispatchToProps (dispatch) {
    return {
      setImage: (fileBlob) => dispatch(imageCropperOpen(fileBlob)),
      imageCropperOnSave: (croppedImage) => dispatch(imageCropperSave(croppedImage)),
      imageCropperOnCancel: (currentSession) => dispatch(imageCropperClose(currentSession))
    };
  }
  constructor (props) {
    super(props);
    this.validate = this.validate.bind(this);
  }
  validate (e) {

  }
  renderImageCropper () {
    if (this.props.imageCropperVisible) {
      return <ImageCropper model={this.props.imageCropperModel}
        onSave={this.props.imageCropperOnSave}
        onCancel={this.props.imageCropperOnCancel} />;
    } else {
      return null;
    }
  }
  render () {
    return <div><h2>Character Form</h2>
      <div>
        <ImageImport onImageLoaded={this.props.setImage} onDropError={noop}>
          <FileInput accept="image/*"
                    onChange={this.props.setImage} >
              <Avatar width={300} height={300} image={null}>
                <div>Drag or click here to import an image</div>
              </Avatar>
          </FileInput>
        </ImageImport>
      </div>
      <label>Name
        <FormInput value={this.props.characterModel.get("name")}
            type="text" name="character['name']" onChange={this.validate} />
      </label>
      { this.renderImageCropper() }
    </div>;
  }
}

export default connect(
  CharacterForm.mapStateToProps,
  CharacterForm.mapDispatchToProps,
)(CharacterForm);
