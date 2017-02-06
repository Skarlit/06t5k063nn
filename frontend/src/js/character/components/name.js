

export default class CharacterName extends React.Component {
  render() {
    return (<div>
      <div>
        <div>{this.props.lastNameHiragana}</div>
        <div>{this.props.lastName}</div>
      </div>
      <div>
        <div>{this.props.lastNameHiragana}</div>
        <div>{this.props.lastName}</div>
      </div>
    </div>);
  }
}

