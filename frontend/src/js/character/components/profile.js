import Locale from "../../locale";
const { Text } = Locale;

export default class Profile extends React.Component {
  renderAge() {

  }
  render() {
    console.log(this.props);
    return (<div className="char-profile">
      <Text textKey={"PROFILE"} className="title" />
      <table className="entries">
        <tbody>
          <Entry textKey="AGE" value={this.props.age} />
          <Entry textKey="RACE" value={this.props.race} />
          <Entry textKey="GENDER" value={this.props.gender} />
          <Entry textKey="HEIGHT" value={this.props.height} />
          <Entry textKey="THREE_SIZE" value={this.props.threeSize.join("/")} />
          <Entry textKey="BLOOD_TYPE" value={this.props.bloodType} />
        </tbody>
      </table>
    </div>);
  }
}

const Entry = props => <tr className="entry basic">
  <td><Text textKey={props.textKey} className="name" /></td>
  <td className="delimiter">: </td>
  <td className="value">{props.value}</td>
</tr>;
