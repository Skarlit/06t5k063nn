import NavBar from "./components/nav_bar";

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
