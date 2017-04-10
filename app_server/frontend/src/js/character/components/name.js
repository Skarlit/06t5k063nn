import Locale from "../../locale";

export default class CharacterName extends React.Component {
  render () {
    const yomi = this.props.locale === "ja" ? <div className="yomi">{this.props.nameHira}</div> : null;
    return (<div className="char-name">
      <div className="name-block">
        {yomi}
        <div className="kanji">{this.props.name}</div>
      </div>
    </div>);
  }
}
