import FbLogin from "./fblogin";
import Modal from "react-modal";
import Locale from "../../locale";

const Text = Locale.Text;
const noop = () => {};
const requestCloseFn = () => {};

export default class LoginMenu extends React.Component {
  render() {
    return (<Modal
      isOpen
      className="login-modal"
      overlayClassName="login-modal-overlay"
      contentLabel="Modal"
    >
      <div className="content">
        <div className="title"><Text textKey="SIGNUP_LOGIN" /></div>
        <div className="btn-wrap">
          <FbLogin />
        </div>
      </div>
    </Modal>);
  }
}
