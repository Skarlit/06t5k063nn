import React from "react";
import { Link } from "react-router";

export default class extends React.Component {
  render() {
    return <h2> <Link to="/create">Create</Link>
    <Link to="/404">not found</Link>
      { this.props.children }
    </h2>;
  }
}
