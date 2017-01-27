import FbLogin from "./fblogin";
import Modal from "react-modal";
import Widgets from "../../widgets";

const Text = Widgets.Text;
const noop = () => {};
const requestCloseFn = () => {};

export default class LoginMenu extends React.Component {
  render() {
    return <Modal
      isOpen={true}
      className="login-modal"
      overlayClassName="login-modal-overlay"
      contentLabel="Modal">
      <div className="content">
        <div className="title"><Text textKey="SIGNUP_LOGIN"></Text></div>
        <div className="btn-wrap">
          <FbLogin />
        </div>
      </div>
    </Modal>;
  }
}
