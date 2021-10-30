import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";

class GoalsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goal: "",
      dueDate: "",
      tags: "",
      show: false,
    };
  }

  //Handles Changes to Inputs
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {

    event.preventDefault();
    // fetch
    fetch(this.props.baseUrl + "/goals", {
      method: "POST",
      body: JSON.stringify({
        goal: this.state.goal,
        dueDate: this.state.dueDate,
        tags: this.state.tags,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        this.props.addGoals(data);
        this.props.toggleGoalModal();
      });
  };

  resetState = () => {
    this.setState({
        goal: "",
        dueDate: "",
        accomplished: false,
        tags: "",
      });
  }

  handleShow = () => {
    this.setState({
      show: true,
    });
  };

  handleClose = () => {
    this.setState({
      show: false,
    });
  };

  render() {
    console.log(this.state.goal);
    return (
      <>
        <Modal class="bg-light"
          show={this.props.goalsFormModal}
          onHide={this.props.toggleGoalModal}
        >
          <form onSubmit={this.handleSubmit}>
            <Modal.Header closeButton>
              <Modal.Title class="text-dark font-welcome-buttons">Create New Goal</Modal.Title>
            </Modal.Header>
            <Modal.Body class="row mx-3 g-1 font-welcome-text">
              <label htmlFor="goal">Goal: </label>
              <input
                type="text"
                id="goal"
                name="goal"
                onChange={(e) => this.handleChange(e)}
                value={this.state.goal}
              />
              <label>Due Date: </label>
              <input
                type="date"
                id="name"
                name="dueDate"
                onChange={(e) => this.handleChange(e)}
                value={this.state.dueDate}
              />
              <label>Tags: </label>
              <input
                type="text"
                id="name"
                name="tags"
                onChange={(e) => this.handleChange(e)}
                value={this.state.tags}
              />
          </Modal.Body><br></br>
            <Modal.Footer>
              <Button variant="secondary" className="font-signup-buttons" onClick={this.props.toggleGoalModal}>
                Close
              </Button>
              <input
                className="btn btn-dark text-light font-signup-buttons"
                type="submit"
                value="Add New Goal"
              />
            </Modal.Footer>
          </form>
        </Modal>
      </>
    );
  }
}

export default GoalsForm;
