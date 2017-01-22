
const noop = () => {};

class Image extends React.Component {
  render() {
    return <a onClick={this.props.onClick || noop}
       className={"image " + this.props.classNames}
       style={{
         width: this.props.width,
         height: this.props.height,
         backgroundImage: `url(${this.props.src})`
       }}>
    </a>;
  }
}


Image.propTypes = {
  src: React.PropTypes.string.isRequired,
  width: React.PropTypes.string.isRequired,
  height: React.PropTypes.string.isRequired,
  classNames: React.PropTypes.string,
  onClick: React.PropTypes.func
};

export default Image;
