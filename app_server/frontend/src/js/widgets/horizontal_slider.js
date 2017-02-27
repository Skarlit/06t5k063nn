export default class HorizontalSlider extends React.Component {
  constructor (props) {
    super(props);
    this._high = this.round(props.high);
    this._low = this.round(props.low);
    this.start = this.start.bind(this);
    this.release = this.release.bind(this);
    this.update = this.update.bind(this);

    this._currentY = props.start || props._low;
    this._dydpx = (this._high - this._low) / props.width;
  }
  shouldComponentUpdate (nextProp, nextState) {
    return this.props.start !== nextState.start;
  }
  round (dec) {
    return dec;
  }
  start (e) {
    this._hold = true;
    this._prevX = e.nativeEvent.clientX;
  }
  release (e) {
    this._hold = false;
  }
  update (e) {
    if (this._hold) {
      let dpx = e.nativeEvent.clientX - this._prevX;
      let dy = this._dydpx * dpx;
      this._currentY = Math.min(this._high, Math.max(this._low, this._currentY + dy));
      this.translateKnob(this._currentY / this._dydpx);
      this.refs.stats.textContent = this.roundForDisplay(this._currentY) + "x";
      this.props.onUpdate(this._currentY);
      this._prevX = e.nativeEvent.clientX;
    }
  }
  translateKnob (d) {
    let el = this.refs.knob;
    let style = "translateX(" + (d - this.props.height) + "px)";
    el.style.webkitTransform = style;
    el.style.MozTransform = style;
    el.style.msTransform = style;
    el.style.OTransform = style;
    el.style.transform = style;
  }
  roundForDisplay (y) {
    return parseInt(y * 100) / 100;
  }
  componentDidMount () {
    this.translateKnob(this._currentY / this._dydpx);
  }
  componentDidUpdate () {
    this.translateKnob(this._currentY / this._dydpx);
  }
  render () {
    return <div className="horizontal-slider">
      {this.props.title}
      <div className="pipe" style={{width: this.props.width, height: this.props.pipeHeight || this.props.height}}>
        <div ref="knob" className="knob" style={{marginTop: -this.props.height / 2, height: this.props.height, width: this.props.height}}>
          <div ref="stats" className="stats" style={{ bottom: -1.5 * this.props.height }}>{this.roundForDisplay(this._currentY)}x</div>
        </div>
      </div>
      <div ref="ui" className="slide-mask" onMouseDown={this.start} onMouseUp={this.release} onMouseLeave={this.release}
          onMouseMove={this.update} ></div>
    </div>;
  }
}
