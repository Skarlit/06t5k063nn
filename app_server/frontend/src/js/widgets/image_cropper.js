
const PREVIEW = "preview";
const EDIT = "edit";
export default class extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      mode: this.props.startWithEdit ? EDIT : PREVIEW
    };
    this.initCanvasState(this.props.model);
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
  renderPreview () {
    return <canvas ref="canvas" width={this.cropW} height={this.cropH} className="preview"></canvas>;
  }
  renderEditor () {
    return <canvas ref="canvas" width={this.cropW} height={this.cropH} className="editor"></canvas>;
  }
  componentDidUpdate () {
    this.initCanvasImage();
  }
  componentDidMount () {
    this.initCanvasImage();
  }
  render () {
    const view = this.mode === PREVIEW ? this.renderPreview() : this.renderEditor();
    return <div className="image-cropper">
      {view}
    </div>;
  }
}
