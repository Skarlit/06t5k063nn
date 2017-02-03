import Widgets from "../../widgets";

const Image = Widgets.Image;


export default class Avatar extends React.Component {
  render() {
    return <div className="char-avatar">
      <Image className="char-image" src={this.props.imageSrc} />
    </div>;
  }
}
