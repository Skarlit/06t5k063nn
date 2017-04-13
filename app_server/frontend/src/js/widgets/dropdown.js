export default class DropDown extends React.Component {
  constructor (props) {
    super(props);
    this.state = {open: false};

    this.toggle = this.toggle.bind(this);
    this.close = this.close.bind(this);
  }
  toggle () {
    this.setState({open: !this.state.open});
  }
  close () {
    this.setState({open: false});
  }
  select (e, idx) {
    this.props.onSelect(this.props.options[idx]);
    this.close();
  }
  render () {
    var selectedValue = this.props.selectedValue || this.props.options[0].value;
    var selected;
    for (let i = 0; i < this.props.options.length; i++) {
      if (this.props.options[i].value === selectedValue) {
        selected = <a className="option" href="javascript://">
        {this.props.options[i].text} </a>;
        break;
      }
    };

    let options = [];
    let backdrop = null;
    if (this.state.open) {
      for (let i = 0; i < this.props.options.length; i++) {
        if (this.props.options[i].value !== selectedValue) {
          ((j) => {
            options.push(<a className="option" href="javascript://"
              key={j} onClick={this.select.bind(this, j)}>
              {this.props.options[i].text}
            </a>);
          })(i);
        }
      }
      backdrop = <div className="backdrop" onClick={this.close}></div>;
    }

    let caret = null;
    if (this.props.options.length > 1) {
      caret = <i className={"fa fa-caret-down caret " + (this.state.open ? "open" : "")} aria-hidden="true"></i>;
    }

    return <div className="dropdown">
      <div className="selected" onClick={this.toggle}>
        { caret }
        { selected }
      </div>
      <div className="options">
        { backdrop }
        { options }
      </div>
    </div>;
  }
}
