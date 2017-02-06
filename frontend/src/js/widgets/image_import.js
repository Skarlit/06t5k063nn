import FileInput from "./file_input";
import { readImageFile } from "../utility/file";

const DEFAULT = 1;
const DRAGSTART = 2;
const ACTIVATE = 3;
const SUCCESS = 4;
const ERROR = 5;

class ImageImport extends React.Component {
  constructor(props) {
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
    document.addEventListener("dragenter", this.onDragEnter);
    document.addEventListener("dragend", this.onDragEnd);
    document.addEventListener("dragleave", this.onDragLeave);
    document.addEventListener("dragover", this.preventDefault);
  }
  componentWillUnmount() {
    document.removeEventListener("dragenter", this.onDragEnter);
    document.removeEventListener("dragend", this.onDragEnd);
    document.removeEventListener("dragleave", this.onDragLeave);
    document.removeEventListener("drop", this.preventDefault);
    document.removeEventListener("dragover", this.onDragEnd);
  }
  shouldComponentUpdate(prevProp, prevState) {
    return this.state.mode != prevState.mode || this.state.hover != prevState.hover;
  }
  onDragEnter(e) {
    e.preventDefault();
    this.enterCounter++;
    this.setState({ mode: DRAGSTART });
    e.stopPropagation();
  }
  onDragLeave(e) {
    e.preventDefault();
    this.enterCounter--;
    if (this.enterCounter == 0) {
      console.log("Drag leaving document");
      this.setState({ mode: DEFAULT });
    }
    e.stopPropagation();
  }
  onDragEnd(e) {
    e.preventDefault();
    this.setState({ mode: DEFAULT });
  }
  onDrop(e) {
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
  onFileInputChange(e) {
    e.preventDefault();
  }
  onMouseEnter() {
    this.setState({ hover: true });
  }
  onMouseLeave() {
    this.setState({ hover: false });
  }
  onDropZoneDragEnter() {
    this.enterDropZoneCounter++;
    this.setState({ mode: ACTIVATE });
  }
  onDropZoneDragLeave() {
    this.enterDropZoneCounter--;
    if (this.enterDropZoneCounter == 0) {
      this.setState({ mode: DRAGSTART });
    }
  }
  render() {
    let view = null;
    switch (this.state.mode) {
      case DEFAULT:
        var fileButton;
        if (this.state.hover) {
          fileButton = (<div style={styles.clickMessage}>
            <div>Click Here</div>
            <div>Or</div>
            <div>Drag to upload</div>
          </div>);
        } else {
          fileButton = (<div>
            <i style={styles.addFileGlyph} className="fa fa-plus" aria-hidden="true" />
          </div>);
        }
        view = (
          <div onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave} style={{ position: "relative", width: "100%", height: "100%" }}>
            <FileInput onChange={this.onFileInputChange} style={styles.fileInputStyle}>
              {fileButton}
            </FileInput>
          </div>
        );
        break;
      case ACTIVATE:
      case DRAGSTART:
        view = (
          <div>
            <div style={{ position: "relative" }} className="bounce infinite">
              <i className="fa fa-arrow-circle-down" aria-hidden="true" style={{ fontSize: 70 }} />
              <div>{"Drop Image Here"}</div>
            </div>
          </div>
        );
        break;
      case ERROR:
        view = (
          <div style={{ fontSize: 20, color: "#aa3939" }}>Unsupported Format : (</div>
        );
        break;
      case SUCCESS:
        view = (
          <div style={{ fontSize: 20, color: "#378B2E" }}> Upload Succeeded </div>
        );
        break;
    }


    return (<div>
      <div
        ref="dropzone" onDrop={this.onDrop} onDragOver={this.preventDefault} onDragEnter={this.onDropZoneDragEnter} onDragLeave={this.onDropZoneDragLeave}
        style={[styles.base, styles.circle, this.state.mode == ACTIVATE ? styles.activate : {}]}
      >
        {view}
      </div>
    </div>);
  }
}

const styles = {
  base: {
    zIndex: 9999,
    boxSizing: "border-box",
    borderRadius: 4,
    fontSize: 15,
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    height: 200,
    width: 200,
    backgroundColor: "rgba(0,0,0,0.2)",
    position: "relative",
    justifyContent: "center",
  },
  innerWrap: {

  },
  fileInputStyle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    width: "100%",
    height: "100%",
  },
  activate: {
    border: "6px dashed grey",
  },
  clickMessage: {
    fontSize: 20,
  },
  addFileGlyph: {
    fontSize: 70,
    color: "white",
  },
  uploadBtn: {
    fontSize: 15,
  },
};

ImageImport.propTypes = {
  onImageLoaded: React.PropTypes.func.isRequired,
};

export default ImageImport;
