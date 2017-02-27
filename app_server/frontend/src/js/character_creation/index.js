import { ImageImport, FileInput } from "../widgets";
import { connect } from "react-redux";
import { imageCropperOpen, imageCropperSave, imageCropperClose } from "./duck";
import {ImageCropperModel} from "../models";
import { ImageCropper } from "../widgets";
import { getImageCropperModel } from "./selectors";
const noop = () => {};

class CharacterCreater extends React.Component {
  static mapStateToProps (state, ownProps) {
    return {
      name: state.characterCreation.get("name"),
      nameJa: state.characterCreation.get("nameJa"),
      origin: state.characterCreation.get("origin"),
      imageCropperModel: getImageCropperModel(state),
      imageCropperVisible: state.characterCreation.getIn(["ui", "imageCropper"])
    };
  }
  static mapDispatchToProps (dispatch) {
    return {
      setImage: (fileBlob) => dispatch(imageCropperOpen(fileBlob)),
      imageCropperOnSave: (croppedImage) => dispatch(imageCropperSave(croppedImage)),
      imageCropperOnCancel: (currentSession) => dispatch(imageCropperClose(currentSession))
    };
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
    return (<div>  RWa Character Creater
            <div>
              <ImageImport onImageLoaded={this.props.setImage} onDropError={noop}>
                <FileInput accept="image/*"
                          onChange={this.props.setImage} >
                   <div>Drag or click here to import an image</div>
                </FileInput>
              </ImageImport>
            </div>
            <input readOnly value={this.props.name} />
            <input readOnly value={this.props.nameJa} />
            <input readOnly value={this.props.origin} />
            { this.renderImageCropper() }
          </div>);
  }
}

export default connect(
  CharacterCreater.mapStateToProps,
  CharacterCreater.mapDispatchToProps,
)(CharacterCreater);
