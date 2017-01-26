import { connect } from "react-redux";
import axios from "axios";
import { loginViaFacebook } from "../actions";

const mapStateToProps = (state, ownProps) => {
  return {
    appId: state.login.getIn(["fbSdk", "appId"]),
    version: state.login.getIn(["fbSdk", "version"]),
    oAuthCallbackUrl: state.endpoints.getIn(["oauth", "fbCallback"])
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: function(user) {
      dispatch(loginViaFacebook(user));
    }
  };
};

class FbLogin extends React.Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
  }
  loadFbSdk() {
    window.fbAsyncInit = () => {
      FB.init({
        status     : true,
        appId      :  this.props.appId,
        xfbml      : true,
        version    :  this.props.version,
        cookie     : true
      });
      FB.AppEvents.logPageView();
      this.parseButton();
      this.setState({ready: true});
    };
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.8";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, "script", "facebook-jssdk"));
  }
  parseButton() {
    if (window.FB) {
      FB.XFBML.parse(this.refs.button);
    }
  }
  componentDidMount() {
    if (!window.FB) {
      this.loadFbSdk();
    }
  }
  login() {
    FB.login((response) => {
      if (response.authResponse) {
        console.log(response.authResponse);
         // since we have cookies enabled, this request will allow omniauth to parse
         // out the auth code from the signed request in the fbsr_XXX cookie
        axios.get(this.props.oAuthCallbackUrl, {

        })
        .then((data) => {
          this.props.login(data);
          console.log(data);   // 'data' contains a 'user' object with 'email' and 'name' in it.
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    }, {scope: "public_profile, email"});
  }
  render() {
    if (!window.FB) return null;
    return <div onClick={this.login} className="fb-login-btn">
      <i className="fa fa-facebook fa-2x" aria-hidden="true"></i>
      <div className="text">Log in with Facebook</div></div>;
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(FbLogin);
