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
        <Modal
          show={this.props.tasksFormModal}
          onHide={this.props.toggleTaskModal}
        >
          <form onSubmit={this.handleSubmit}>
            <Modal.Header closeButton>
              <Modal.Title>Create New Task</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                  <label htmlFor="task">Task: </label>
                  <input
                    type="text"
                    id="task"
                    name="task"
                    onChange={(e) => this.handleChange(e)}
                    value={this.state.task}
                  />
                  <label>Due Date: </label>
                  <input
                    type="date"
                    id="dueDate"
                    name="dueDate"
                    onChange={(e) => this.handleChange(e)}
                    value={this.state.dueDate}
                  />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.props.toggleTaskModal}>
                Close
              </Button>
              <input
                className="btn btn-primary"
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
