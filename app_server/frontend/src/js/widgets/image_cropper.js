
const PREVIEW = "preview";
const EDIT = "edit";
export default class extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      mode: this.props.startWithEdit ? EDIT : PREVIEW
    };
  }
  shouldComponentUpdate (nextProp, nextState) {
    return nextProp.imageBlob !== this.props.imageBlob ||
       (this.state.mode !== nextState.mode);
  }
  initCanvasState () {
    this.x = 0;
    this.y = 0;
    this.scale = 1;
  }
  initCanvasImage () {
    this.ctx = this.refs.canvas.getContext("2d");
  }
  renderPreview () {
    return <canvas ref="canvas" class="preview"></canvas>;
  }
  renderEditor () {
    return <canvas ref="canvas" class="editor"></canvas>;
  }
  componentDidUpdate () {
  }
  componentDidMount () {

  }
  render () {
    const view = this.mode === PREVIEW ? this.renderPreview() : this.renderEditor();
    return <div className="image-cropper">
      {view}
    </div>;
  }
}
