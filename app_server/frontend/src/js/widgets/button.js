export default class Button extends React.Component {
  render () {
    return <button onClick={this.props.onClick} className={this.props.type}>
      {this.props.children}
    </button>;
  }
}
