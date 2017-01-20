class LocaleBtn extends React.Component {
  constructor(props) {
    super(props);
  }
  changeLocale() {

  }
  render() {
    return <div>
      this.props.locale
    </div>;
  }
}

LocaleBtn.propTypes = {
  locale: React.PropTypes.string.isRequired
};


export default LocaleBtn;
