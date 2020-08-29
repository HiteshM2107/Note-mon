import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import ViewNotes from "./ViewNotes";
import CreateNotes from "./CreateNotes";
import Nav from "./Nav";
import Logout from "./Logout";

class nav extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Nav />
          <Switch>
            {/* <Route exact path='/' component={Login} /> */}
            <Route exact path="/view">
              <ViewNotes id={this.props.id} login={this.props.login} />
            </Route>
            <Route exact path="/create">
              <CreateNotes id={this.props.id} login={this.props.login} />
            </Route>
            <Route exact path="/logout">
              <Logout />
            </Route>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default nav;
