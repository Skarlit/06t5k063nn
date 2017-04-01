import { readImageFile } from "../utility";

class FileInput extends React.Component {
  constructor (props) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  componentWillUnmount () {
  }
  onClick () {
    this.refs.input.click();
  }
  onChange (e) {
    if (e.target.files.length > 0) {
      readImageFile(e.target.files[0], (e, blob) => {
        this.props.onChange(blob);
      });
    }
  }
  render () {
    return (<div className="file-input" onClick={this.onClick} style={this.props.style || {}} >
          {this.props.children}
      <input ref="input" type="file"
            accept={this.props.accept || ""}
            onChange={this.onChange} style={{ display: "none" }} />
    </div>);
  }
}

FileInput.propTypes = {
  onChange: React.PropTypes.func.isRequired
};

export default FileInput;
