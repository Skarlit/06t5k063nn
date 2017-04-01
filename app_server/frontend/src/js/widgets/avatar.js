export default class extends React.Component {
  render () {
    let style = this.props.style || {};
    style.background = `url(${this.props.image})`;
    style.width = this.props.width;
    style.height = this.props.height;
    return <div className="avatar" style={style}>
      { this.props.image ? null : this.props.children}
    </div>;
  }
}
