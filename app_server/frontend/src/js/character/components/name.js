import Locale from "../../locale";

export default class CharacterName extends React.Component {
  render () {
    return (<div className="char-name">
      <div className="name-block">
        <div className="yomi">{this.props.lastName.yomi}</div>
        <div className="kanji">{this.props.lastName.kanji}</div>
      </div>
      <div className="name-block">
        <div className="yomi">{this.props.firstName.yomi}</div>
        <div className="kanji">{this.props.firstName.kanji}</div>
      </div>
    </div>);
  }
}
