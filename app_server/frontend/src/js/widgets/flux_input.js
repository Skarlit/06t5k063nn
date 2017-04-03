import FormInput from "./form_input";
const TIMEOUT = 100;
export default class FluxInput extends React.Component {
  constructor (props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this._dispatchHandle = null;
  }
  onChange (e) {
    if (this._dispatchHandle) clearTimeout(this._dispatchHandle);
    let inputString = e.currentTarget.value;
    // this._dispatchHandle = setTimeout(() => {
    this.props.onChange(inputString);
    // }, (this.props.dispatchTimeout || TIMEOUT));
  }
  render () {
    return <FormInput type="text" value={this.props.value} onChange={this.onChange} />;
  }
}

