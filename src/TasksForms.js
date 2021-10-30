import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

class TasksForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      task: "",
      dueDate: "",
    };
    // this.handleGoalChange = this.handleGoalChange.bind(this);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    fetch(this.props.baseUrl + "/tasks", {
      method: "POST",
      body: JSON.stringify({
        task: this.state.task,
        dueDate: this.state.dueDate,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        this.props.addTask(data);
        this.props.toggleTaskModal()
      });
  };

  render() {
    return (
      <>
        <Modal class="bg-light"
          show={this.props.tasksFormModal}
          onHide={this.props.toggleTaskModal}
        >
          <form onSubmit={this.handleSubmit}>
            <Modal.Header closeButton>
              <Modal.Title class="text-dark font-welcome-buttons">Create New Task</Modal.Title>
            </Modal.Header>
            <Modal.Body class="row mx-3 g-3 font-welcome-text">
              <div>
                  <label htmlFor="task">Task: </label><br></br>
                  <input
                    type="text"
                    id="task"
                    name="task"
                    onChange={(e) => this.handleChange(e)}
                    value={this.state.task}
                  />
                <br></br>
                  <label>Due Date: </label><br></br>
                  <input
                    type="date"
                    id="dueDate"
                    name="dueDate"
                    onChange={(e) => this.handleChange(e)}
                    value={this.state.dueDate}
                  /><br></br>
              </div>
            </Modal.Body>
            <br></br>
            <Modal.Footer>
              <Button variant="secondary" className="font-signup-buttons" onClick={this.props.toggleTaskModal}>
                Close
              </Button>
              <input
                className="btn btn-dark text-light font-signup-buttons"
                type="submit"
                value="Add New Task"
              />
              {/* <Button variant="primary"  type="submit" onClick={this.props.toggleGoalModal}>
              Add New Goal
            </Button> */}
            </Modal.Footer>
          </form>
        </Modal>
      </>
    );
  }
}

export default TasksForm;
