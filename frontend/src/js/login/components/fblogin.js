import FbLoginBtn from "react-facebook-login";

import { connect } from "react-redux";

const mapStateToProps = (state, ownProps) => {
  return {
    appId: state.login.getIn(["fb_sdk", "appId"]),
  };
};

const mapDispatchToProps = (state, ownProps) => {
  return {

  };
};

class FbLogin extends React.Component {
  render() {
    return <div>
      <FbLoginBtn appId={this.props.appId}
        autoLoad={true}
        fields="name,picture"
        callback={function(){}}
        cssClass="my-facebook-button-class"
        icon="fa-facebook"
      />
    </div>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FbLogin);
