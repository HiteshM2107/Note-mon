import React, { Component } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
export default class CreateNotes extends Component {
  constructor() {
    super();
    this.state = {
      flag: 0,
      title: "",
      body: "",
      loading: false,
      uid: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount = () => {
    this.setState({ flag: 1, loading: true, show: true, uid: this.props.id });
    // this.setState({ flag: 1 });
    //console.log(this.state.uid);
  };

  handleClose = () => {
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

  async handleSubmit() {
    // console.log(this.state.title);
    // console.log(this.state.body);
    let res = await axios.post(`/api/create/${this.state.uid}`, this.state);
    //console.log(res);
    this.setState({ show: false });
  }

  render() {
    return (
      <div>
        {/* <button
          className="button-use"
          onClick={this.createNote}
          disabled={this.state.loading}
        >
          Create a Note
        </button> */}
        <Modal show={this.state.show} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create your new Note: </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleChange}
              placeholder="Title of the Note"
              required
            />
            <hr />
            <textarea
              name="body"
              cols="30"
              rows="15"
              value={this.state.body}
              onChange={this.handleChange}
              placeholder="Body of the Note"
              required
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="success" onClick={this.handleSubmit}>
              Save Note
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
