import { Text } from "../widgets";
import Locale from "../locale";

export default class Footer extends React.Component {
  render () {
    return (<div className="footer">
      <Locale />
      <div className="disclaimer">
        <Text textKey="DISCLAIMER" />
      </div>
    </div>);
  }
}
