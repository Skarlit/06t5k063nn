import CircularSlider from "./circular_slider";
import HorizontalSlider from "./horizontal_slider";
import Text from "./text";
import {ImageTransform} from "../utility";

export default class ImageCropper extends React.Component {
  constructor (props) {
    super(props);
    this.state = {ready: false};
    this.bindActions();
  }
  bindActions () {
    this.rotateImage = this.rotateImage.bind(this);
    this.scaleImage = this.scaleImage.bind(this);
    this.start = this.start.bind(this);
    this.move = this.move.bind(this);
    this.release = this.release.bind(this);
    this.drawFrame = this.drawFrame.bind(this);
    this.reset = this.reset.bind(this);
    this.save = this.save.bind(this);
    this.cancel = this.cancel.bind(this);
  }
  shouldComponentUpdate (nextProp, nextState) {
    return this.props.model !== nextProp.model ||
       (this.state.mode !== nextState.mode);
  }
  initCanvasImage () {
    let self = this;
    let img = new Image();

    img.onload = function () {
      // Load source image into source canvas
      self.srcCanvas = document.createElement("canvas");
      self.srcCtx = self.srcCanvas.getContext("2d");
      self.srcCanvas.width = this.width;
      self.srcCanvas.height = this.height;
      self.srcCtx.drawImage(img, 0, 0);

      // Draw source image to display canvas
      self.ctx = self.refs.canvas.getContext("2d");
      self.ctx.drawImage(img, 0, 0);

      // Init transform of the display image.
      self.imageTransform = new ImageTransform(self.srcCanvas.width, self.srcCanvas.height, self.canvasWidth, self.canvasHeight);

      self.setState({ready: true});
    };
    img.src = this.props.model.get("imageBlob");
  }
  componentDidMount () {
    if (!this.state.ready) {
      this.initCanvasImage();
    }
  }
  rotateImage (rad) {
    this.imageTransform.rotate(rad);
    window.requestAnimationFrame(this.drawFrame);
  }
  scaleImage (factor) {
    this.imageTransform.zoom(factor);
    window.requestAnimationFrame(this.drawFrame);
  }
  reset () {
    this.imageTransform.reset();
    window.requestAnimationFrame(this.drawFrame);
  }
  move (e) {
    if (this._hold) {
      let evt = e.nativeEvent;
      let dx = evt.clientX - this._prevX;
      let dy = evt.clientY - this._prevY;
      this._prevX = evt.clientX;
      this._prevY = evt.clientY;
      this.imageTransform.move(dx, dy);
      window.requestAnimationFrame(this.drawFrame);
    }
  }
  start (e) {
    this._hold = true;
    this._prevX = e.nativeEvent.clientX;
    this._prevY = e.nativeEvent.clientY;
  }
  release () {
    this._hold = false;
  }
  drawFrame () {
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.ctx.save();
    this.ctx.setTransform.apply(this.ctx, this.imageTransform.transform);
    this.ctx.drawImage(this.srcCanvas, 0, 0);
    this.ctx.restore();
    this.imageTransform.updateInvertCache();
  }
  save () {
    let data = this.ctx.getImageData(
      0.5 * (this.canvasWidth - this.cropW),
      0.5 * (this.canvasHeight - this.cropH),
      this.cropW, this.cropH);
    let tmpCanvas = document.createElement("canvas");
    tmpCanvas.width = this.cropW;
    tmpCanvas.height = this.cropH;
    let ctx = tmpCanvas.getContext("2d");
    ctx.putImageData(data, 0, 0);
    this.props.onSave(tmpCanvas.toDataURL("image/png"));
  }
  cancel () {
    this.props.onCancel();
  }
  renderResetBtn () {
    return <a className="reset-btn" onClick={this.reset}>
        <Text textKey="RESET">
          <i className="fa fa-undo"></i>
        </Text>
    </a>;
  }
  renderEditor () {
    const cropAreaStyle = {
      width: this.cropW,
      height: this.cropH,
      top: 0.5 * (this.canvasHeight - this.cropH),
      left: 0.5 * (this.canvasWidth - this.cropW),
      boxShadow: `0 0 0 ${0.5 * (this.canvasWidth - this.cropW)}px rgba(0, 0, 0, 0.67)`
    };
    return <div ref="frame" className="frame" style={{width: this.canvasWidth, height: this.canvasHeight}}>
            <canvas ref="canvas" className="editor"
                width={this.canvasWidth} height={this.canvasHeight}
                onMouseDown={this.start}
                onMouseMove={this.move}
                onMouseLeave={this.release}
                onClick={this.release}
                onMouseUp={this.release}></canvas>
            <div ref="croparea" className="crop-area" style={cropAreaStyle}></div>
          </div>;
  }
  renderWindowControl () {
    return <div className="window-control-wrap" style={{width: this.canvasWidth}}>
      <a className="save-btn" onClick={this.save} href="javascript://"><Text textKey="SAVE" /></a>
      <a className="cancel-btn" onClick={this.cancel} href="javascript://"><Text textKey="CANCEL" /></a>
    </div>;
  }
  render () {
    // Init dimensions
    this.cropW = this.props.model.get("cropWidth");
    this.cropH = this.props.model.get("cropHeight");
    this.canvasWidth = Math.min(window.innerWidth, 600);
    this.canvasHeight = Math.min(window.innerHeight - 300, 600);

    let hSliderHigh = 5;
    let hSliderLow = 0.1;

    return <div className="image-cropper">
      <div className="backdrop"></div>
      <div className="container">
        <div ref="edit-view" className="frame-wrap" style={{width: this.canvasWidth, height: this.canvasHeight}}>
          <div className="rot-wrap">
            <CircularSlider size={80} knobSize={16} onUpdate={this.rotateImage} />
          </div>
          {this.renderEditor()}
          <div className="bottom-wrap">
            {this.renderResetBtn()}
            <HorizontalSlider pipeHeight={8} width={300} height={24} high={hSliderHigh} low={hSliderLow} start={1} onUpdate={this.scaleImage} />
          </div>
        </div>
        {this.renderWindowControl()}
      </div>
    </div>;
  }
}

ImageCropper.propTypes = {
  model: React.PropTypes.object.isRequired,
  onSave: React.PropTypes.func.isRequired,
  onCancel: React.PropTypes.func.isRequired
}
;
