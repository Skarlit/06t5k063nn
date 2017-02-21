import FileInput from "./file_input";
import { readImageFile } from "../utility/file";

const DEFAULT = 1;
const DRAGSTART = 2;
const SUCCESS = 4;
const ERROR = 5;

class ImageImport extends React.Component {
  constructor (props) {
    super(props);
    this.state = { mode: DEFAULT, hover: false };
    this.onDragEnter = this.onDragEnter.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.onFileInputChange = this.onFileInputChange.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.onDropZoneDragEnter = this.onDropZoneDragEnter.bind(this);
    this.onDropZoneDragLeave = this.onDropZoneDragLeave.bind(this);
    this.preventDefault = (e) => { e.preventDefault(); };
    this.enterCounter = 0;
    this.enterDropZoneCounter = 0;
  }
  componentWillUnmount () {
    document.removeEventListener("dragenter", this.onDragEnter);
    // document.removeEventListener("dragend", this.onDragEnd);
    // document.removeEventListener("dragleave", this.onDragLeave);
    // document.removeEventListener("drop", this.preventDefault);
    // document.removeEventListener("dragover", this.onDragEnd);
  }
  componentDidMount () {
    document.addEventListener("dragenter", this.onDragEnter);
    // document.addEventListener("dragend", this.onDragEnd);
    // document.addEventListener("dragleave", this.onDragLeave);
    // document.addEventListener("dragover", this.preventDefault);
  }
  shouldComponentUpdate (prevProp, prevState) {
    return this.state.mode !== prevState.mode || this.state.hover !== prevState.hover;
  }
  onDragEnter (e) {
    e.preventDefault();
    console.log(e);
    this.enterCounter++;
    this.setState({ mode: DRAGSTART });
    e.stopPropagation();
  }
  onDragLeave (e) {
    e.preventDefault();
    this.enterCounter--;
    if (this.enterCounter == 0) {
      console.log("Drag leaving document");
      this.setState({ mode: DEFAULT });
    }
    e.stopPropagation();
  }
  onDragEnd (e) {
    e.preventDefault();
    this.setState({ mode: DEFAULT });
  }
  onDrop (e) {
    e.preventDefault();
    e.stopPropagation();

    const file = e.nativeEvent.dataTransfer.files[0];
    if (/image/.test(file.type)) {
      readImageFile(file, (e, fileBlob) => {
        this.props.onImageLoaded(fileBlob);
        this.setState({ mode: SUCCESS });
      });
    } else {
      this.setState({ mode: ERROR });
    }
  }
  onFileInputChange (e) {
    e.preventDefault();
  }
  onMouseEnter () {
    this.setState({ hover: true });
  }
  onMouseLeave () {
    this.setState({ hover: false });
  }
  onDropZoneDragEnter () {
    this.enterDropZoneCounter++;
    // this.setState({ mode: ACTIVATE });
  }
  onDropZoneDragLeave () {
    this.enterDropZoneCounter--;
    if (this.enterDropZoneCounter === 0) {
      this.setState({ mode: DEFAULT });
    }
  }
  renderDropZone () {
    if (this.state.mode === DRAGSTART) {
      return <div className="dropzone" ref="dropzone" onDrop={this.onDrop}
          onDragOver={this.preventDefault}
          onDragEnter={this.onDropZoneDragEnter}
          onDragLeave={this.onDropZoneDragLeave} >
          <div>
          </div>
        </div>;
    }
    return null;
  }
  render () {
    return (<div>
        { this.renderDropZone }
        <div>
          { this.props.children }
        </div>
      </div>);
  }
}

ImageImport.propTypes = {
  onImageLoaded: React.PropTypes.func.isRequired
};

export default ImageImport;
