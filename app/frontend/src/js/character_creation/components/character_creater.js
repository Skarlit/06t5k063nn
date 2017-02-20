import FileImport from "../widgets/image_import";
import { connect } from "react-redux";
import { setCharacterCreationImage } from "../actions";

const mapStateToProps = (state, ownProps) => {
  console.log(state);
  return {
    name: state.characterCreation.get("name"),
    nameJa: state.characterCreation.get("nameJa"),
    origin: state.characterCreation.get("origin"),
    imageBlob: state.characterCreation.get("imageBlob"),
  };
};

const mapDispatchToProps = dispatch => ({
  setImage: (fileBlob) => {
    dispatch(setCharacterCreationImage(fileBlob));
  },
});

class CharacterCreater extends React.Component {
  render() {
    return (<div className="pure-form"> Character Creater
      <div>
        <FileImport onImageLoaded={this.props.setImage} />
      </div>
      <img src={this.props.imageBlob} />
      <input readOnly value={this.props.name} />
      <input readOnly value={this.props.nameJa} />
      <input readOnly value={this.props.origin} />
    </div>);
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CharacterCreater);
