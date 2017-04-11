import mat2d from "gl-matrix-mat2d";
import vec2 from "gl-matrix-vec2";

export default class ImageTransform {
  constructor (srcW, srcH, canvasW, canvasH) {
    [srcW, srcH, canvasW, canvasH].forEach((el) => {
      if (el == null || isNaN(el)) throw new Error("Invalid argument for ImageTransform");
    });
    // Init image configuration
    this._rot = 0;
    this._scale = 1;
    this._B = mat2d.identity(mat2d.create());
    this._invB = mat2d.create();
    this._prevScale = this._scale;
    this._prevRot = this._rot;

    /* Init dummy local variables */
    this._p = vec2.create();
    this._scaleMatrix = mat2d.create();
    this._rotMatrix = mat2d.create();

    // Init src image configuration
    this._srcCenter = [0.5 * srcW, 0.5 * srcH];
    this._negSrcCenter = [-0.5 * srcW, -0.5 * srcH];

    // Init display canvas configuration
    this._canvasCenter = [canvasW * 0.5, canvasH * 0.5];
  }
  get transform () { return this._B; }
  rotate (rad) {
    this._rot = -rad; // negative to adjust clockwise direction
    let dRad = this._rot - this._prevRot;

    // Rotate around image center
    mat2d.translate(this._B, this._B, this._srcCenter);
    mat2d.rotate(this._B, this._B, dRad);
    mat2d.translate(this._B, this._B, this._negSrcCenter);

    // TODO: Rotate around display canvas center
    this._prevRot = this._rot;
  }
  move (dx, dy) {
    // we find canonical vector [dx, dy] in image's basis denoted as p
    vec2.transformMat2(this._p, [dx, dy], this._invB);
    // we translate image's basis by p
    mat2d.translate(this._B, this._B, this._p);
  }
  zoom (factor) {
    this._scale = factor;
    let ds = this._scale / this._prevScale;
    // we zoom in using canvasCenter as fix point when zooming.
    // we find canonical point canvasCenter in image's basis denoted as p
    vec2.transformMat2d(this._p, this._canvasCenter, this._invB);
    // Calc the offset needed to make point canvasCenter fixed.
    this._scaleMatrix[0] = ds; this._scaleMatrix[2] = 0; this._scaleMatrix[4] = this._p[0] * (1 - ds);
    this._scaleMatrix[1] = 0; this._scaleMatrix[3] = ds; this._scaleMatrix[5] = this._p[1] * (1 - ds);

    // Scale and translate the image's basis
    mat2d.mul(this._B, this._B, this._scaleMatrix);
    this._prevScale = this._scale;
  }
  reset () {
    this._B = mat2d.create();
  }
  updateInvertCache () {
    mat2d.invert(this._invB, this._B);
  }
}
