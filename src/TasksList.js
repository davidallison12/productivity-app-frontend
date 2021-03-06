import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

class TasksList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalHere: false,
      currentTask: {},
    };
  }

  showModal = (task) => {
    console.log(task);
    this.setState({
      modalHere: true,
      currentTask: task,
      task: task.task,
      dueDate: task.dueDate,
      accomplished: task.accomplished,
      createdOn: task.createdOn,
    });
  };

  closeModal = (event) => {
    // event.preventDefault();

    this.setState({
      modalHere: false,
    });
  };

  handleChange = (event) => {
    console.log(event.target);
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleCheckbox = (event) => {
    console.log(event.target.value);
    this.setState({
      [event.target.name]: !this.state.accomplished,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    // fetch
    console.log("Something happened");
    console.log(event.target.accomplished.checked);
    const url = this.props.baseUrl + "/tasks/" + this.state.currentTask._id;
    try {
      const response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify({
          task: this.state.task,
          dueDate: this.state.dueDate,
          createdOn: this.state.createdOn,
          accomplished: event.target.accomplished.checked,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.status === 200) {
        const updatedTask = await response.json();
        console.log(updatedTask);
        const findIndex = this.props.tasks.findIndex(
          (task) => task._id === updatedTask.id
        );
        const copyTasks = [...this.props.tasks];
        copyTasks[findIndex] = updatedTask;
        this.props.handleEditedTaskData(copyTasks);
      } else {
        response.json().then((data) => {
          console.log(data);
        });
      }
      this.setState({
        modalHere: false,
      });
      this.props.getTasks();
    } catch (err) {
      console.log("Error => ", err);
    }
  };

  render() {
    const listTasks = this.props.tasks.map((task) => {
      return (
        <tr className="border-light align-middle text-center" key={task._id}>
          <td>{task.task}</td>
          <td>{task.dueDate}</td>
          <td>{task.createdOn}</td>
          <td>{task.accomplished ? "true" : "false"}</td>
          <td>
            <button
              type="button"
              className="btn btn-lg btn-light"
              onClick={() => {
                this.showModal(task);
              }}
            >
              {" "}
              EDIT
            </button>
          </td>
          <td
            onClick={() => {
              this.props.deleteTask(task._id);
            }}
          >
            <i className="icon bi-trash-fill"></i>
          </td>
        </tr>
      );
    });

    return (
      <>
      <div className="container">
        <h1 className="font-link text-light badge badge-dark">Task List</h1>
        <table className="table table-dark table-striped font-goal-task">
          <thead className="font-headers text-light align-middle text-center">
            <td>Task</td>
            <td>Due Date</td>
            <td>Created On</td>
            <td>Accomplished</td>
          </thead>
          <tbody>{listTasks}</tbody>
        </table>
        </div>
        {this.state.modalHere && (
          <Modal
            show={this.state.modalHere}
            onHide={this.closeModal}
          >
            <form onSubmit={this.handleSubmit}>
              <Modal.Header closeButton>
                <Modal.Title class="text-dark font-welcome-buttons">Update Task</Modal.Title>
              </Modal.Header>
              <Modal.Body class="row mx-3 g-1 font-welcome-text">
                <label htmlFor="task">Goal: </label><br></br>
                <input
                  type="text"
                  id="task"
                  name="task"
                  onChange={(e) => this.handleChange(e)}
                  value={this.state.task}
                /><br></br>
                <label htmlFor="dueDate">Due Date: </label>
                <input
                  type="date"
                  id="dueDate"
                  name="dueDate"
                  onChange={(e) => this.handleChange(e)}
                  value={this.state.dueDate}
                /><br></br>
              <label class="text-center" htmlFor="accomplished">Accomplished: </label>
                <br></br>
                {this.state.accomplished ? (
                  <input
                    type="checkbox"
                    id="accomplished"
                    name="accomplished"
                    onChange={(e) => this.handleCheckbox(e)}
                    checked
                  />
                ) : (
                  <input
                    type="checkbox"
                    id="accomplished"
                    name="accomplished"
                    onChange={(e) => this.handleCheckbox(e)}
                  />
                )}
              </Modal.Body><br></br>
              <Modal.Footer>
                <Button
                  variant="secondary" className="font-signup-buttons"
                  onClick={this.closeModal}
                >
                  Close
                </Button>
                <input
                  className="btn btn-dark text-light font-signup-buttons"
                  type="submit"
                  value="Update Task"
                />
              </Modal.Footer>
            </form>
          </Modal>
        )}
      </>
    );
  }
}

export default TasksList;
