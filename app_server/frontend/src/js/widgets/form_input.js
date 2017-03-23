const noop = () => {};

export default class FormInput extends React.Component {
  render () {
    let inputType = this.props.type || "text";
    let className = this.props.className || `form-input ${inputType}`;
    let style = this.props.style || {};
    let placeholder = this.props.placeholder || "";
    return <input type={inputType}
      style = {style}
      value = {this.props.value || ""}
      className={className}
      onChange={this.props.onInput || noop}
      onFocus={this.props.onFocus || noop}
      onBlur ={this.props.onBlur || noop}
      name={this.props.name}
      placeholder={placeholder} />;
  }
}

FormInput.propTypes = {
  name: React.PropTypes.string.isRequired,
  type: React.PropTypes.string.isRequired
};
