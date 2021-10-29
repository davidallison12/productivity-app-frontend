import React, { Component } from "react";

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

  handleChange = (event) => {
    console.log(event.target);
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleCheckbox = (event) => {
    console.log(event.target.value);
    this.setState({
      [event.target.name]: !this.state.accomplished
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
        // credentials: "include",
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
        <tr key={task._id}>
          <td>{task.task}</td>
          <td>{task.dueDate}</td>
          <td>{task.createdOn}</td>
          <td>{task.accomplished ? "true" : "false"}</td>
          <td>
            <button
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
      <div>
        <h1>Task List</h1>
        <table>
          <thead>
            <th>Task</th>
            <th>Due Date</th>
            <th>Created On</th>
            <th>Accomplished</th>
            <th> </th>
          </thead>
          <tbody>{listTasks}</tbody>
        </table>

        {this.state.modalHere && (
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={this.handleSubmit}>
                <div className="modal-header">
                  <h5 className="modal-title" id="editGoalsModalLabel">
                    Edit Goals
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <label htmlFor="task">Goal: </label>
                  <input
                    type="text"
                    id="task"
                    name="task"
                    onChange={(e) => this.handleChange(e)}
                    value={this.state.task}
                  />
                  <label htmlFor="dueDate">Due Date: </label>
                  <input
                    type="date"
                    id="dueDate"
                    name="dueDate"
                    onChange={(e) => this.handleChange(e)}
                    value={this.state.dueDate}
                  />
                  <label htmlFor="accomplished">Accomplished: </label>

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
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <input
                    type="submit"
                    className="btn btn-primary"
                    value="Add New Goal"
                  />
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default TasksList;
