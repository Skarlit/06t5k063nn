import { ImageImport, FileInput } from "../widgets";
import { connect } from "react-redux";
import { IMPORT_IMAGE_BLOB } from "./duck";
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
      imageCropperModel: getImageCropperModel(state)
    };
  }
  static mapDispatchToProps (dispatch) {
    return {
      setImage: (fileBlob) => {
        dispatch({
          type: IMPORT_IMAGE_BLOB,
          image: new ImageCropperModel({imageBlob: fileBlob})
        });
      }
    };
  }
  render () {
    return (<div className="pure-form">  RWa Character Creater
            <div>
              <ImageImport onImageLoaded={this.props.setImage} onDropError={noop}>
                <FileInput accept="image/*"
                          onChange={this.props.setImage} >
                   <div>Drag or click here to import an image</div>
                </FileInput>
              </ImageImport>
            </div>
            <ImageCropper model={this.props.imageCropperModel} />
            <input readOnly value={this.props.name} />
            <input readOnly value={this.props.nameJa} />
            <input readOnly value={this.props.origin} />
          </div>);
  }
}

export default connect(
  CharacterCreater.mapStateToProps,
  CharacterCreater.mapDispatchToProps,
)(CharacterCreater);
