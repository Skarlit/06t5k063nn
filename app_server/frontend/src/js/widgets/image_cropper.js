import CircularSlider from "./circular_slider";
import HorizontalSlider from "./horizontal_slider";
import mat2d from "gl-matrix-mat2d";
import vec2 from "gl-matrix-vec2";
import Text from "./text";

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
    this.reset = this.reset.bind(this);
    this.flipY = this.flipY.bind(this);
    this.save = this.save.bind(this);
    this.cancel = this.cancel.bind(this);
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
    this.cropW = model.get("cropWidth");
    this.cropH = model.get("cropHeight");
    this.canvasWidth = Math.min(window.innerWidth, 600);
    this.canvasHeight = Math.min(window.innerHeight - 300, 600);

    this.srcCanvas = document.createElement("canvas");
    this.srcCtx = this.srcCanvas.getContext("2d");
    this.srcWidth = this.canvasWidth;
    this.srcHeight = this.canvasHeight;

    this.ctxTransform = mat2d.identity(mat2d.create());
    this._prevScale = this.scale;
    this._prevRot = this.rot;
    this._srcCenter = vec2.create();
    this._negSrcCenter = vec2.create();
    this._canvasCenter = [this.canvasWidth * 0.5, this.canvasHeight * 0.5];
    this._invCtxTransform = mat2d.create();
    this._updateComputationCache();

    /* pre initialized dummy local variables */
    this._d = vec2.create();
    this._scaleMatrix = mat2d.create();
  }
  _updateComputationCache () {
    mat2d.invert(this._invCtxTransform, this.ctxTransform);
    this._srcCenter[0] = 0.5 * this.srcWidth;
    this._srcCenter[1] = 0.5 * this.srcHeight;
    this._negSrcCenter[0] = -this._srcCenter[0];
    this._negSrcCenter[1] = -this._srcCenter[1];
  }
  initCanvasImage () {
    this.ctx = this.refs.canvas.getContext("2d");
    let img = new Image();

    let $this = this;

    img.onload = function () {
      $this.srcCanvas.width = this.width;
      $this.srcCanvas.height = this.height;
      $this.srcWidth = this.width;
      $this.srcHeight = this.height;
      $this.srcCtx.drawImage(img, 0, 0);
      $this.ctx.drawImage(img, 0, 0);
      $this._updateComputationCache();
    };
    img.src = this.props.model.get("imageBlob");
  }
  componentDidUpdate () {
    this.initCanvasImage();
  }
  componentDidMount () {
    this.initCanvasImage();
  }
  rotateImage (rad) {
    this.rot = -rad; // negative to adjust clockwise direction
    let dRad = this.rot - this._prevRot;
    // Note: no need to scale srcCenter, the scaling is entailed in ctxTranform,
    // when we draw the image, it will scale the it.
    mat2d.translate(this.ctxTransform, this.ctxTransform, this._srcCenter);
    mat2d.rotate(this.ctxTransform, this.ctxTransform, dRad);
    mat2d.translate(this.ctxTransform, this.ctxTransform, this._negSrcCenter);
    this._prevRot = this.rot;
    window.requestAnimationFrame(this.drawFrame);
  }
  scaleImage (factor) {
    this.scale = factor;
    let ds = this.scale / this._prevScale;
    // we use transforMat2d because we want to exact coordinate of the center in the frame of the image.
    // we must consider translation as well.
    vec2.transformMat2d(this._d, this._canvasCenter, this._invCtxTransform);
    // Find the offset by setting the fixed point of the scaling to the center
    this._scaleMatrix[0] = ds; this._scaleMatrix[2] = 0; this._scaleMatrix[4] = this._d[0] * (1 - ds);
    this._scaleMatrix[1] = 0; this._scaleMatrix[3] = ds; this._scaleMatrix[5] = this._d[1] * (1 - ds);

    // Apply the scaling matrix as passive transformation.
    mat2d.mul(this.ctxTransform, this.ctxTransform, this._scaleMatrix);
    this._prevScale = this.scale;
    window.requestAnimationFrame(this.drawFrame);
  }
  flipY () {
    mat2d.scale(this.ctxTransform, this.ctxTransform, [-1, 1]);
    mat2d.translate(this.ctxTransform, this.ctxTransform, [-this.srcWidth * 0.5, 0]);
    window.requestAnimationFrame(this.drawFrame);
  }
  reset () {
    this.ctxTransform = mat2d.create();
    window.requestAnimationFrame(this.drawFrame);
  }
  move (e) {
    if (this._hold) {
      let evt = e.nativeEvent;
      let dx = evt.clientX - this._prevX;
      let dy = evt.clientY - this._prevY;
      this._prevX = evt.clientX;
      this._prevY = evt.clientY;
      // we use mat2 instead of mat2d here because we are only interested in
      // the direction of the vertical vector on screen written in image frame.
      vec2.transformMat2(this._d, [dx, dy], this._invCtxTransform);
      // If we use mat2d above, this._id will be mapped to some random location
      // which will mess up ctxTranform when we translate.
      mat2d.translate(this.ctxTransform, this.ctxTransform, this._d);
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
    this.ctx.setTransform.apply(this.ctx, this.ctxTransform);
    this.ctx.drawImage(this.srcCanvas, 0, 0);
    this.ctx.restore();
    this._updateComputationCache();
  }
  save () {
    let data = this.ctx.getImageData(
      this._canvasCenter[0] - 0.5 * this.cropW,
      this._canvasCenter[1] - 0.5 * this.cropH,
      this.cropW, this.cropH);
    let tmpCanvas = document.createElement("canvas");
    let ctx = tmpCanvas.getContext("2d");
    ctx.putImageData(data, 0, 0);
    this.props.onSave({
      croppedImage: tmpCanvas.toDataURL()
    });
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
  renderFlipBtn () {
    return null;
    // return <a className="flip-btn" onClick={this.flipY}>Mirror</a>;
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
            <HorizontalSlider pipeHeight={8} width={300} height={24} high={3} low={0.1} start={1} onUpdate={this.scaleImage} />
            {this.renderFlipBtn()}
          </div>
        </div>
        {this.renderWindowControl()}
      </div>
    </div>;
  }
}

