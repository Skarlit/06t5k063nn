import { connect } from "react-redux";
import Avatar from "./components/avatar";
import Name from "./components/name";
import Profile from "./components/profile";
import { getProfile, getFullName, getAvartarData } from "./selectors";

class Character extends React.Component {
  static state2Prop (state, ownProps) {
    return {
      avatar: getAvartarData(state, { id: ownProps.params.characterId }),
      name: getFullName(state, { id: ownProps.params.characterId }),
      profile: getProfile(state, { id: ownProps.params.characterId })
    };
  }
  render () {
    return (<div className="char-content">
      <div className="row">
        <Avatar imageSrc={this.props.avatar.imageSrc} />
        <div className="panel">
          <Name {...this.props.name} />
          <Profile {...this.props.profile} />
        </div>
      </div>
    </div>);
  }
}

export default connect(Character.state2Prop)(Character);
