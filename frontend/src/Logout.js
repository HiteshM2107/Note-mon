import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

class Login extends Component {
  state = {
    show: false,
  };

  componentDidMount = () => {
    this.setState({ show: true });
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  handlelogout = () => {
    window.location.reload();
  };

  render() {
    return (
      <div>
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Are you sure you want to logout? </Modal.Title>
          </Modal.Header>
          {/* <Modal.Body></Modal.Body> */}
          <Modal.Footer>
            <Button variant="primary" onClick={this.handleClose}>
              Cancel
            </Button>
            <Button
              variant="danger"
              onClick={() => {
                this.handlelogout();
              }}
            >
              Confirm Logout
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default Login;
