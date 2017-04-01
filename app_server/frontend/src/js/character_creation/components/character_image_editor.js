import { connect } from "react-redux";
import { imageCropperLoadCharacter, imageCropperClose, setCharacterFormImage } from "../duck";
import { getCharacterImageCropperSession, getCharacterAvatarImage, getImageCropperVisible } from "../selectors";
import { ImageCropper, ImageImport, FileInput, Avatar } from "../../widgets/";

const noop = () => {};

class CharacterImageEditor extends React.Component {
  static mapStateToProps (state, ownProps) {
    return {
      avatarImage: getCharacterAvatarImage(state),
      cropperModel: getCharacterImageCropperSession(state),
      cropperVisible: getImageCropperVisible(state)
    };
  }
  static mapDispatchToProps (dispatch) {
    return {
      importImage: (fileBlob) => dispatch(imageCropperLoadCharacter(fileBlob)),
      cropperSave: (croppedImage) => dispatch(setCharacterFormImage(croppedImage)),
      cropperCancel: (currentSession) => dispatch(imageCropperClose(currentSession)),
      importImageFromFile: (f) => {
        console.log(f);
      }
    };
  }
  renderImageCropper () {
    if (this.props.cropperVisible) {
      return <ImageCropper model={this.props.cropperModel}
        onSave={this.props.cropperSave}
        onCancel={this.props.cropperCancel} />;
    } else {
      return null;
    }
  }
  render () {
    return <div className="image-editor">
      <Avatar width={300} height={300} image={this.props.avatarImage}>
        <div>Drag or click here to import an image</div>
      </Avatar>
      <ImageImport onImageLoaded={this.props.importImage} onDropError={noop}>
        <FileInput accept="image/*" onChange={this.props.importImage} >
        </FileInput>
      </ImageImport>
      { this.renderImageCropper() }
    </div>;
  }
}

export default connect(
  CharacterImageEditor.mapStateToProps,
  CharacterImageEditor.mapDispatchToProps,
)(CharacterImageEditor);
