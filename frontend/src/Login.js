import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import Home from "./Home";
import Signup from "./Signup";
import "./App.css";
class Login extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      show: false,
      login: false,
      email: "",
      password: "",
      id: "",
      name: "",
      check: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  showModal = () => {
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false, check: true });
  };

  handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value,
    });
    //console.log("State :", this.state);
  };

  async handleLogin() {
    //console.log("State: ", this.state);
    let res = await axios.post("./user/login", this.state);
    // console.log("hello");
    // console.log(res);
    //console.log("response is--", res.data.message, "name is-", res.data.name);
    this.setState({ id: res.data, name: res.data.name });
    //this.setState({ stat: res.status });
    // console.log(this.state.stat);
    // console.log("name:", this.state.name);
    // console.log("id:", this.state.id);
    // console.log(res.data.message);
    if (res.data.message === "error") {
      this.setState({ check: false });
    } else {
      this.setState({ login: true });
    }
    // console.log("login is--", this.state.login);
    // console.log("final state-", this.state);
    // console.log(this.state.check);
  }

  render() {
    if (this.state.login === true) {
      return (
        <Home
          id={this.state.id}
          login={this.state.login}
          creatorname={this.state.name}
        />
      );
    } else {
      return (
        <React.Fragment>
          <button
            className="button-use"
            onClick={this.showModal}
            disabled={this.state.loading}
          >
            Login
          </button>
          <Modal show={this.state.show} onHide={this.hideModal}>
            <Modal.Header closeButton>
              <Modal.Title>
                Please enter your credentials to login:{" "}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <input
                type="email"
                name="email"
                onChange={this.handleChange}
                placeholder="Email"
                required
              />
              <hr />
              <input
                name="password"
                type="password"
                onChange={this.handleChange}
                placeholder="Password"
                required
              />
              <hr />
              <Button variant="danger" onClick={this.hideModal}>
                Close
              </Button>
              <Button variant="success" onClick={this.handleLogin}>
                Login
              </Button>
              {this.state.check === false ? (
                <h5 className="wrong">Oops! Invalid Email or Password</h5>
              ) : (
                <> </>
              )}
            </Modal.Body>
            <Modal.Footer>
              New here? Sign up please
              <Signup />
              <hr />
            </Modal.Footer>
          </Modal>
        </React.Fragment>
      );
    }
  }
}

export default Login;
