import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import { Modal, Button } from "react-bootstrap";
import { ImSpinner } from "react-icons/im";
import { BiEditAlt } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

import "bootstrap/dist/css/bootstrap.min.css";

export default class ViewNotes extends Component {
  constructor() {
    super();
    this.state = {
      Notes: [],
      loading: false,
      flag: 0,
      edit: 0,
      show: false,
      show1: false,
      title: "",
      body: "",
      id: "",
      uid: "",
      emp: false,
    };

    // this.state = this.state.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  // Function to view Notes
  fetchData = (props) => {
    this.setState({ uid: this.props.id });
    this.setState({ loading: true, uid: this.props.id }, () => {
      axios
        .get(`/api/view/${this.state.uid}`)
        .then((response) => {
          this.setState({
            Notes: response.data.note,
            flag: 1,
            loading: false,
          });
          // console.log(this.state.Notes);
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  componentDidMount = (props) => {
    this.setState({ uid: this.props.id, login: this.props.login });
    this.setState({ loading: true, uid: this.props.id }, () => {
      axios
        .get(`/api/view/${this.state.uid}`)
        .then((response) => {
          this.setState({
            Notes: response.data.note,
            flag: 1,
            loading: false,
          });
          // console.log(this.state.Notes);
          if (this.state.Notes.length === 0) {
            this.setState({ emp: true });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;
    if (name === "title") {
      this.setState({
        title: value,
      });
    }
    if (name === "body") {
      this.setState({
        body: value,
      });
    }
    //console.log("State :", this.state);
  };

  async handleSubmit(state) {
    // console.log(state.title);
    // console.log("yes");

    // console.log(state);

    let res = await axios.patch(`/api/update/${state.id}`, state);
    // console.log(res);
    this.fetchData();
    this.setState({ show: false });
  }

  askDelete = (id, title, body) => {
    this.setState({ id: id, title: title, body: body });
    this.setState({ show1: true });
  };

  // Function to Delete a Note
  handleDelete = (id) => {
    axios.delete(`/api/delete/${id}`);
    // console.log("Note Deleted ", { id });
    this.fetchData();
    this.setState({ show1: false });
  };

  handleClose1 = () => {
    this.setState({ show1: false });
  };
  // Function to Edit a Note
  handleEdit = (id, title, body) => {
    this.setState({ id: id, title: title, body: body });
    this.setState({ show: true });
  };

  handleClose = () => {
    this.setState({ show: false });
  };

  render() {
    const { loading } = this.state;
    return (
      <React.Fragment>
        {/* {this.state.flag === 0 ? (
          // <button
          //   className="button-use"
          //   onClick={this.fetchData}
          //   disabled={loading}
          // >
            {loading && (
              // <i
              //   className="fa fa-refresh fa-spin"
              //   style={{ marginRight: "5px" }}
              // />
              <FaSpinner />
            )}
            {loading && <span> Loading.......</span>}
            {!loading && <span>View my Notes</span>}
          </button>
        ) : ( */}
        {this.state.loading ? (
          <ImSpinner size="50px" />
        ) : (
          <div>
            {this.state.emp ? (
              <h2>Sorry, you dont have any notes.</h2>
            ) : (
              <h1>Here are all your notes</h1>
            )}

            {this.state.Notes.slice(0)
              .reverse()
              .map((obj, idx) => (
                <div key={idx} className="card">
                  <p className="title">{`${obj.title}`}</p>
                  <p className="body-note">{`${obj.body}`}</p>
                  {/* <h6>{`${obj._id}`}</h6> */}
                  {/* {Target} */}
                  {/* {this.setState({ TargetTitle: obj._id })} */}
                  {/* {TargetId=${obj._id} */}
                  {/* <h6>Note No: {idx + 1}</h6> */}

                  <button
                    style={{ flexDirection: "row" }}
                    className="btn btn-lg"
                    onClick={() => {
                      this.askDelete(obj._id, obj.title, obj.body);
                    }}
                  >
                    <MdDelete />
                  </button>
                  <button
                    className="btn btn-lg"
                    onClick={() => {
                      this.handleEdit(obj._id, obj.title, obj.body);
                      //console.log(obj.title);
                    }}
                  >
                    <BiEditAlt />
                  </button>
                  <div>
                    {/* Modal for Deleting */}
                    <Modal show={this.state.show1} onHide={this.handleClose1}>
                      <Modal.Header closeButton>
                        <Modal.Title>
                          You are about to delete this note. Are you sure?{" "}
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <input
                          name="title"
                          type="text"
                          value={this.state.title}
                        ></input>
                        <hr />
                        <textarea
                          name="body"
                          type="textarea"
                          cols="30"
                          rows="15"
                          value={this.state.body}
                        ></textarea>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="primary" onClick={this.handleClose}>
                          Cancel
                        </Button>
                        <Button
                          variant="danger"
                          onClick={() => {
                            this.handleDelete(this.state.id);
                          }}
                        >
                          Delete
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </div>
                  <div>
                    {/* Modal for updating */}
                    <Modal show={this.state.show} onHide={this.handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Please make the changes: </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <input
                          name="title"
                          type="text"
                          value={this.state.title}
                          onChange={this.handleChange}
                        ></input>
                        <hr />
                        <textarea
                          name="body"
                          type="textarea"
                          cols="30"
                          rows="15"
                          value={this.state.body}
                          onChange={this.handleChange}
                        ></textarea>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="danger" onClick={this.handleClose}>
                          Close
                        </Button>
                        <Button
                          variant="success"
                          onClick={() => {
                            this.handleSubmit(this.state);
                          }}
                        >
                          Save Changes
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </div>
                </div>
              ))}
          </div>
        )}
      </React.Fragment>
    );
  }
}
