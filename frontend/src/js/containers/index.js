import React from "react";
import { Link } from "react-router";

export default class extends React.Component {
  render() {
    return <div>
      <nav>
        <Link to="/create">Create</Link>
        <Link to="/search">Search</Link>
      </nav>
      <div>
        { this.props.children }
      </div>
    </div>;
  }
}
