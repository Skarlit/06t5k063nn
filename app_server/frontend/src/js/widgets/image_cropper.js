import CircularSlider from "./circular_slider";
import HorizontalSlider from "./horizontal_slider";

const PREVIEW = "preview";
const EDIT = "edit";
export default class extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      mode: this.props.startWithEdit ? EDIT : PREVIEW
    };
    this.initCanvasState(this.props.model);
    this.rotateImage = this.rotateImage.bind(this);
    this.scaleImage = this.scaleImage.bind(this);
  }
  shouldComponentUpdate (nextProp, nextState) {
    return this.props.model !== nextProp.model ||
       (this.state.mode !== nextState.mode);
  }
  initCanvasState (model) {
    this.x = model.x;
    this.y = model.y;
    this.scale = model.scale;
    this.cropW = model.cropWidth;
    this.cropH = model.cropHeight;
  }
  initCanvasImage () {
    this.ctx = this.refs.canvas.getContext("2d");
    let img = new Image();
    img.crossOrigin = "Anonymous";
    img.onload = () => {
      this.ctx.drawImage(img, this.x, this.y);
    };
    img.src = this.props.model.imageBlob;
  }
  renderEditor () {
    ;
    return;
  }
  componentDidUpdate () {
    this.initCanvasImage();
  }
  componentDidMount () {
    this.initCanvasImage();
  }
  rotateImage (deg) {

  }
  scaleImage (factor) {

  }
  render () {
    return <div className="image-cropper">
      <div className="backdrop"></div>
      <div ref="edit-view">
        <canvas ref="canvas" width={this.cropW} height={this.cropH} className="editor"></canvas>
      </div>
      <CircularSlider size={120} knobSize={16} onUpdate={this.rotateImage} />
      <HorizontalSlider pipeHeight={8} width={300} height={24} high={3} low={0.1} start={1} onUpdate={this.scaleImage} />
    </div>;
  }
}

