class FileInput extends React.Component {
  constructor (props) {
    super(props);
    this.onClick = this.onClick.bind(this);
  }
  componentWillUnmount () {
  }
  onClick () {
    this.refs.input.click();
  }
  render () {
    return (<div onClick={this.onClick} style={this.props.style || {}} >
          {this.props.children}
      <input ref="input" type="file"
            accept={this.props.accept || ""}
            onChange={this.props.onChange} style={{ display: "none" }} />
    </div>);
  }
}

FileInput.propTypes = {
  onChange: React.PropTypes.func.isRequired
};

export default FileInput;
