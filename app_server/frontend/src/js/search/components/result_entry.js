import { Link } from "react-router";
import { Avatar } from "../../widgets";
export default class ResultEntry extends React.Component {
  render () {
    const result = this.props.result;
    const image = result._source.avatar;
    const name = result._source.name;
    const nameHira = (result._source.name_hira || "").replace(/\s/, "").toLowerCase();
    let link = `/character/${result._id}/${nameHira}`;
    return <Link to={link}>
      <Avatar width={50} height={50} image={image} />
      <div>{name}</div>
    </Link>;
  }
}
