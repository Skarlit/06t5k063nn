import Locale from "../locale";

const Text = Locale.Text;

export default class Footer extends React.Component {
  render() {
    return (<div className="footer">
      <Locale.view />
      <div className="disclaimer">
        <Text textKey="DISCLAIMER" />
      </div>
    </div>);
  }
}
