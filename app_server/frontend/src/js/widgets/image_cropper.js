import CircularSlider from "./circular_slider";
import HorizontalSlider from "./horizontal_slider";
import mat2d from "gl-matrix-mat2d";
import vec2 from "gl-matrix-vec2";

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
    this.start = this.start.bind(this);
    this.move = this.move.bind(this);
    this.release = this.release.bind(this);
    this.drawFrame = this.drawFrame.bind(this);
  }
  shouldComponentUpdate (nextProp, nextState) {
    return this.props.model !== nextProp.model ||
       (this.state.mode !== nextState.mode);
  }
  initCanvasState (model) {
    this.rot = 0;
    this.x = 0;
    this.y = 0;
    this.scale = 1;
    this.cropW = model.cropWidth;
    this.cropH = model.cropHeight;
    this.canvasWidth = Math.min(window.innerWidth, 600);
    this.canvasHeight = Math.min(window.innerHeight - 300, 600);

    this.ctxTransform = mat2d.identity(mat2d.create());
    this._prevScale = this.scale;
    this._prevRot = this.rot;

    this.cropArea = {
      width: this.cropW,
      height: this.cropH,
      top: 0.5 * (this.canvasHeight - this.cropH),
      left: 0.5 * (this.canvasWidth - this.cropW)
    };
  }
  initCanvasImage () {
    this.ctx = this.refs.canvas.getContext("2d");
    let img = new Image();
    img.crossOrigin = "Anonymous";
    let $this = this;
    img.onload = function () {
      $this.srcCanvas = document.createElement("canvas");
      $this.srcCanvas.width = this.width;
      $this.srcCanvas.height = this.height;
      $this.srcCtx = $this.srcCanvas.getContext("2d");
      $this.srcCtx.drawImage(img, 0, 0);
      $this.ctx.drawImage(img, 0, 0);
    };
    img.src = require("../../img/test/yukina_test.jpg");  // this.props.model.imageBlob;
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
  rotateImage (rad) {
    this.rot = -rad; // it rotates clockwise in context hence negative.
    let dRad = this.rot - this._prevRot;
    // this.ctx.translate(this.canvasWidth / 2, this.canvasHeight / 2);
    // this.ctx.rotate(dRad);
    // this.ctx.translate(-this.canvasWidth / 2, -this.canvasHeight / 2);
    let centerX = 0.5 * this.scale * this.canvasWidth;
    let centerY = 0.5 * this.scale * this.canvasHeight;
    let inverseD = [-centerX, -centerY];
    mat2d.translate(this.ctxTransform, this.ctxTransform, [centerX, centerY]);
    mat2d.rotate(this.ctxTransform, this.ctxTransform, dRad);
    console.log(mat2d);

    // vec2.transformMat2(inverseD, inverseD, );
    mat2d.translate(this.ctxTransform, this.ctxTransform, inverseD);
    this._prevRot = this.rot;
    window.requestAnimationFrame(this.drawFrame);
  }
  scaleImage (factor) {
    this.scale = Math.sign(this.scale) * factor;
    mat2d.scale(this.ctxTransform, this.ctxTransform, [this.scale / this._prevScale, this.scale / this._prevScale]);
    this._prevScale = this.scale;
    window.requestAnimationFrame(this.drawFrame);
  }
  start (e) {
    this._hold = true;
    this._prevX = e.nativeEvent.clientX;
    this._prevY = e.nativeEvent.clientY;
  }
  release () {
    this._hold = false;
  }
  move (e) {
    if (this._hold) {
      let evt = e.nativeEvent;
      let dx = evt.clientX - this._prevX;
      let dy = evt.clientY - this._prevY;
      this._prevX = evt.clientX;
      this._prevY = evt.clientY;
      let displacement = vec2.create();
      console.log([dx, dy]);
      vec2.transformMat2(displacement, [dx, dy], this.ctxTransform);
      console.log(vec2.str(displacement));
      mat2d.translate(this.ctxTransform, this.ctxTransform, displacement);
      // mat2d.translate(this.ctxTransform, this.ctxTransform, [dx, dy]);
      window.requestAnimationFrame(this.drawFrame);
    }
  }
  drawFrame () {
    this.ctx.save();
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    this.ctx.restore();
    // this.ctx.drawImage(this.srcCanvas,
    // 0, 0, this.srcCanvas.width, this.srcCanvas.height,
    // 0, 0, this.scale * this.srcCanvas.width, this.srcCanvas.height);
    console.log(mat2d.str(this.ctxTransform));
    this.ctx.setTransform.apply(this.ctx, this.ctxTransform);
    // this.ctx.translate(-this.scale * 0.5 * this.canvasWidth, -this.scale * 0.5 * this.canvasHeight);
    this.ctx.drawImage(this.srcCanvas, 0, 0);
  }
  render () {
    const editDim = {width: this.canvasWidth, height: this.canvasHeight};
    const cropAreaStyle = this.cropArea;
    return <div className="image-cropper">
      <div className="backdrop"></div>
      <div className="container">
        <CircularSlider size={120} knobSize={16} onUpdate={this.rotateImage} />
        <div ref="edit-view" className="frame-wrap" style={editDim}>
          <div ref="frame" className="frame" style={editDim}>
            <canvas ref="canvas" className="editor"
                width={this.canvasWidth} height={this.canvasHeight}
                onMouseDown={this.start}
                onMouseMove={this.move}
                onMouseLeave={this.release}
                onClick={this.release}
                onMouseUp={this.release}></canvas>
            <div ref="croparea" className="crop-area" style={cropAreaStyle}></div>
          </div>
          <HorizontalSlider pipeHeight={8} width={300} height={24} high={3} low={0.1} start={1} onUpdate={this.scaleImage} />
        </div>
      </div>
    </div>;
  }
}

