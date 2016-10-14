import React from "react";
import { connect } from "react-redux";

const mapStateToProps = (state, ownProps) => {
  return {
    name: state.characterCreation.get("name"),
    nameJa: state.characterCreation.get("nameJa"),
    origin: state.characterCreation.get("origin"),
  };
};

const mapDispatchToProps = (state, ownProps) => {
  return {

  };
};

class CharacterCreater extends React.Component {
  render() {
    return <div> Character Creater
      <input readOnly value={this.props.name} />
      <input readOnly value={this.props.nameJa} />
      <input readOnly value={this.props.origin} />
    </div>;
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CharacterCreater);
