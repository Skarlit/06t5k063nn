class CharacterAttr extends React.Component {
  render () {
    return <div>
              <FormInput value={this.props.characterModel.get("name")}
            type="text" name="character['name']" onChange={this.validate} />
    </div>;
  }
}
