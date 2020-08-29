import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import "./App.css";
export default class nav extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-light">
          <Link to="/view">
            <Button className="btn-use btn-md">View my Notes</Button>
          </Link>

          <Link to="/create">
            <Button className="btn-use btn-md">Create a Note</Button>
          </Link>

          <Link to="/logout">
            <Button className="btn-use btn-md">Logout</Button>
          </Link>
        </nav>
      </div>
    );
  }
}
