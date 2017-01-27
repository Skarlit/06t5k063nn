import NavBar from "./components/navbar";
import Login from "./login";

export default class extends React.Component {
  render() {
    return <div>
      <NavBar />
      <div>
        { this.props.children }
      </div>
    </div>;
  }
}
