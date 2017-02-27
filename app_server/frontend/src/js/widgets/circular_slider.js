export default class CircularSlider extends React.Component {
  constructor (props) {
    super(props);
    this.state = {deg: 0};
    this.start = this.start.bind(this);
    this.release = this.release.bind(this);
    this.update = this.update.bind(this);
  }
  shouldComponentUpdate (nextProp, nextState) {
    return this.state.deg !== nextState.deg;
  }
  start (e) {
    this._hold = true;
  }
  release (e) {
    this._hold = false;
  }
  update (e) {
    if (this._hold) {
      let evt = e.nativeEvent;
      let dim = this.refs.ui.getBoundingClientRect();
      let x = evt.clientX - dim.left - this.props.size / 2;
      let y = evt.clientY - dim.top - this.props.size / 2;
      let rad = Math.atan2(-y, x);
      let deg = this.rad2Deg(rad);
      this.props.onUpdate(rad);
      this.setState({deg: deg});
    }
  }
  deg2Rad (deg) {
    return deg / 180 * Math.PI;
  }
  rad2Deg (rad) {
    return parseInt((rad / Math.PI * 180));
  }
  render () {
    const size = this.props.size;
    const center = this.props.size / 2;
    const knobR = this.props.knobSize / 2;
    const orbitR = center - knobR;
    let rad = this.deg2Rad(this.state.deg);
    const knobX = center + orbitR * Math.cos(rad);
    const knobY = center - orbitR * Math.sin(rad);
    return <div className="circular-slider">
      <div className="spin-mask" onMouseDown={this.start} onMouseUp={this.release} onMouseLeave={this.release}
          onMouseMove={this.update} ></div>
      <svg ref="ui" width={size} height={size}>
        <circle className="bg-disk" cx={center} cy={center} r={center} />
        <circle className="front-disk" cx={center} cy={center} r={center - this.props.knobSize}/>
        <circle className="knob" cx={knobX} cy={knobY} r={knobR} />
        <text className="stats" textAnchor="middle" x={center} y={center}>{this.state.deg}</text>
      </svg>
    </div>;
  }
}
