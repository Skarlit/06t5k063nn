// import { ImageImport } from "../widgets";
import { connect } from "react-redux";
// import { setCharacterCreationImage } from "../actions";

class CharacterCreater extends React.Component {
  static mapStateToProps (state, ownProps) {
    return {
      name: state.characterCreation.get("name"),
      nameJa: state.characterCreation.get("nameJa"),
      origin: state.characterCreation.get("origin"),
      imageBlob: state.characterCreation.get("imageBlob")
    };
  }
  static mapDispatchToProps (dispatch) {
    return {
      setImage: (fileBlob) => {
        // dispatch(setCharacterCreationImage(fileBlob));
      }
    };
  }
  render () {
    return (<div className="pure-form">  RWa Character Creater
            <div>
              <ImageImport onImageLoaded={this.props.setImage} />
            </div>
            <img src={this.props.imageBlob} />
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
