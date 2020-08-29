import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      show: false,
      signup: false,
      email: "",
      password: "",
      name: "",
      check: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  showModal = () => {
    this.setState({ show: true, check: true });
  };

  hideModal = () => {
    this.setState({ show: false });
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

  async handleSignup() {
    //console.log("State: ", this.state);
    let res = await axios.post("./user/signup", this.state);
    //console.log(res.status);
    if (res.data.message === "error") {
      this.setState({ check: false });
    } else {
      this.setState({ signup: true, show: false });
    }
  }

  render() {
    return (
      <div>
        <button
          className="button-use"
          onClick={this.showModal}
          disabled={this.state.loading}
        >
          Sign Up
        </button>
        <Modal show={this.state.show} onHide={this.hideModal}>
          <Modal.Header closeButton>
            <Modal.Title>Please enter your details to SignUp: </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              type="String"
              name="name"
              onChange={this.handleChange}
              placeholder="Name"
              required
            />
            <hr />
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
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={this.hideModal}>
              Close
            </Button>
            <Button variant="success" onClick={this.handleSignup}>
              Sign Up
            </Button>
            {this.state.check === false ? (
              <h5 className="wrong">
                Sorry! User already exists. Please use a different Email.
              </h5>
            ) : (
              <> </>
            )}
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Signup;
