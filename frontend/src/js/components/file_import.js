const DEFAULT = 1;
const EXPAND = 2;
const ACTIVATE = 3;

export default class FileImport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {mode: DEFAULT};
    this.onDragEnterWindow = this.onDragEnterWindow.bind(this);
    this.onDragExitWindow = this.onDragExitWindow.bind(this);
    this.onDragEnter = this.onDragEnter.bind(this);
    this.onDragLeave = this.onDragLeave.bind(this);
    window.addEventListener("dragenter", this.onDragEnterWindow);
    window.addEventListener("dragexit", this.onDragExitWindow);
  }
  shouldComponentUpdate(prevProp, prevState) {
    return this.state.mode != prevState.mode;
  }
  onDragEnterWindow(e) {
    this.setState({mode: EXPAND});
  }
  onDragExitWindow(e) {
    this.setState({mode: DEFAULT});
  }
  onDragEnter() {
    this.setState({mode: ACTIVATE});
  }
  onDragLeave() {
    this.setState({mode: EXPAND});
  }
  onDrop(e) {

  }
  componentWillUnmount() {
    window.removeListener("dragenter", this.onDragEnterWindow);
    window.removeListener("dragexit", this.onDragExitWindow);
  }
  render() {
    console.log(this.state.mode);
    return <div onDragEnter={this.onDragEnter} onDragLeave={this.onDragLeave}>
      <i className="fa fa-file" aria-hidden="true"></i>
    </div>;
  }
}
