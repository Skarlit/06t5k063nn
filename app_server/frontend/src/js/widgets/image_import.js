import { readImageFile } from "../utility";
import { Text } from "../widgets";

const DEFAULT = "default";
const DRAGSTART = "drag-start";
const SUCCESS = "load-success";
const ERROR = "drop-error";

class ImageImport extends React.Component {
  constructor (props) {
    super(props);
    this.state = { mode: DEFAULT, hover: false };
    this.onDragStart = this.onDragStart.bind(this);
    this.onDragEnter = this.onDragEnter.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.rescueBadState = this.rescueBadState.bind(this);
    this.enterCounter = 0;
  }
  componentWillUnmount () {
    document.removeEventListener("dragenter", this.onDragEnter);
    document.removeEventListener("dragstart", this.onDragStart);
    document.removeEventListener("dragend", this.onDragEnd);
    document.removeEventListener("dragleave", this.onDragLeave);
    window.removeEventListener("blur", this.rescueBadState);
    window.removeEventListener("focus", this.rescueBadState);
  }
  componentDidMount () {
    document.addEventListener("dragenter", this.onDragEnter);
    document.addEventListener("dragstart", this.onDragStart);
    document.addEventListener("dragend", this.onDragEnd);
    document.addEventListener("dragleave", this.onDragLeave);
    window.addEventListener("blur", this.rescueBadState);
    window.addEventListener("focus", this.rescueBadState);
  }
  shouldComponentUpdate (prevProp, prevState) {
    return this.state.mode !== prevState.mode;
  }
  rescueBadState () {
    if (this.state.mode !== DEFAULT) {
      this.enterCounter = 0;
      this.setState({mode: DEFAULT});
      console.log("rescue bad state");
    }
  }
  onDragStart (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  onDragEnter (e) {
    this.enterCounter++;
    this.setState({ mode: DRAGSTART });
  }
  onDragLeave (e) {
    this.enterCounter--;
    if (this.enterCounter === 0) {
      this.setState({ mode: DEFAULT });
    }
  }
  onDragEnd (e) {
    this.setState({ mode: DEFAULT });
  }
  onDrop (e) {
    e.preventDefault();
    e.stopPropagation();
    const file = e.nativeEvent.dataTransfer.files[0];
    if (/image/.test(file.type)) {
      readImageFile(file, (e, fileBlob) => {
        this.props.onImageLoaded(fileBlob);
      });
    } else {
      this.props.onDropError(e);
    }
    this.rescueBadState();
  }
  onDragOver (e) {
    e.preventDefault();
    e.stopPropagation();
  }
  renderDropZone () {
    const className = this.state.mode;
    return <div className={"dropzone " + className} onDragOver={this.onDragOver} onDrop={this.onDrop}>
      <div className="status-message">
        <i className="fa fa-caret-square-o-down" aria-hidden="true"></i>
        <Text textKey="DROP_FILE_MSG" className="text"></Text>
      </div>
    </div>;
  }
  render () {
    return (<div className="image-import">
        { this.renderDropZone() }
      <div>
        { this.props.children }
      </div>
    </div>);
  }
}

ImageImport.propTypes = {
  onImageLoaded: React.PropTypes.func.isRequired,
  onDropError: React.PropTypes.func.isRequired
};

export default ImageImport;
