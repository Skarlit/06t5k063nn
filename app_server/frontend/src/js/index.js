import NavBar from "./components/navbar";
import Footer from "./components/footer";
import Login from "./login";

export default class extends React.Component {
  render () {
    return (<div className="app">
      <NavBar />
      <div className="content">
        { this.props.children }
      </div>
      <Footer />
    </div>);
  }
}
