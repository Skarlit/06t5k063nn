
const noop = () => {};

class Image extends React.Component {
  render() {
    let style = {backgroundImage: `url(${this.props.src})`};
    if (this.props.width) style.width = this.props.width;
    if (this.props.height) style.height = this.props.height;
    return <div onClick={this.props.onClick || noop}
       className={"image " + (this.props.className || "")}
       style={style}>
    </div>;
  }
}


Image.propTypes = {
  src: React.PropTypes.string.isRequired,
  width: React.PropTypes.string,
  height: React.PropTypes.string,
  classNames: React.PropTypes.string,
  onClick: React.PropTypes.func
};

export default Image;
