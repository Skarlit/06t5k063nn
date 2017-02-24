export default class HorizontalSlider extends React.Component {
  constructor (props) {
    super(props);
    this._high = this.round(props.high);
    this._low = this.round(props.low);
    this.start = this.start.bind(this);
    this.release = this.release.bind(this);
    this.update = this.update.bind(this);

    this._current = props.start || props.low;
  }
  shouldComponentUpdate (nextProp, nextState) {
    return this.props.start !== nextState.start;
  }
  round (dec) {
    return parseInt(dec * 10) / 10;
  }
  start (e) {
    this._hold = true;
  }
  release (e) {
    this._hold = false;
  }
  update (e) {
    if (this._hold) {
      if (this.refs.stats.classList.contains("fade")) {
        this.refs.stats.classList.remove("fade");
      }
      let evt = e.nativeEvent;
      let dim = this.refs.ui.getBoundingClientRect();
      let x = evt.clientX - dim.left;
      this._current = this.round(x / this.props.width * (this._high - this._low) + this._low);
      let leftOffset = this.props.width * (this._current - this._low) / (this._high - this._low);
      this.refs.knob.style["left"] = leftOffset + "px";
      this.refs.stats.innerHTML = this._current;
      this.props.onUpdate(this._current);
      this.fadeStat();
    }
  }
  fadeStat () {
    if (this._fadeStatHandle) {
      clearTimeout(this._fadeStatHandle);
      this._fadeStatHandle = null;
    }
    this._fadeStatHandle = setTimeout(() => {
      this.refs.stats.classList.add("fade");
    }, 1000);
  }
  render () {
    let leftOffset = this.props.width * (this._current - this._low) / (this._high - this._low);
    return <div className="horizontal-slider">
      <div className="pipe" style={{width: this.props.width, height: this.props.pipeHeight || this.props.height}}>
        <div ref="knob" className="knob" style={{marginTop: -this.props.height / 2, left: leftOffset, height: this.props.height, width: this.props.height}}>
          <div ref="stats" className="stats" style={{ bottom: -1.5 * this.props.height }}>{this._current}</div>
        </div>
      </div>
      <div ref="ui" className="slide-mask" onMouseDown={this.start} onMouseUp={this.release} onMouseLeave={this.release}
          onMouseMove={this.update} ></div>
    </div>;
  }
}
