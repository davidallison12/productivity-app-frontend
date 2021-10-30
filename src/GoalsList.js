import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";

class GoalsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalHere: false,
      currentGoal: {},
    };
  }

  showModal = (goal) => {
    console.log(goal);
    this.setState({
      modalHere: true,
      currentGoal: goal,
      goal: goal.goal,
      dueDate: goal.date,
      accomplished: goal.accomplished,
      tags: goal.tags,
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
    console.log(event.target);
    const url = this.props.baseUrl + "/goals/" + this.state.currentGoal._id;
    try {
      const response = await fetch(url, {
        method: "PUT",
        body: JSON.stringify({
          goal: this.state.goal,
          dueDate: this.state.dueDate,
          tags: this.state.tags,
          accomplished: event.target.accomplished.checked,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        // credentials: "include",
      });
      if (response.status === 200) {
        const updatedGoal = await response.json();
        console.log(updatedGoal);
        const findIndex = this.props.goals.findIndex(
          (goal) => goal._id === updatedGoal.id
        );
        const copyGoals = [...this.props.goals];
        copyGoals[findIndex] = updatedGoal;
        this.props.handleData(copyGoals);
      } else {
        response.json().then((data) => {
          console.log(data);
        });
      }
      this.setState({
        modalHere: false,
      });
      this.props.getGoals();
    } catch (err) {
      console.log("Error => ", err);
    }
  };

  render() {
    const listGoals = this.props.goals.map((goal) => {
      return (
        <tr className="border-light align-middle text-center" key={goal._id}>
          <td>{goal.goal}</td>
          <td>{goal.dueDate}</td>
          <td>{goal.accomplished ? "true" : "false"}</td>
          <td>{goal.tags}</td>
          <td>
            <button
              type="button"
              className="btn btn-lg btn-light"
              onClick={() => {
                this.showModal(goal);
              }}
            >
              {" "}
              EDIT
            </button>
          </td>
          <td
            onClick={() => {
              this.props.deleteGoal(goal._id);
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
        <br></br>
        <h1 className="font-link text-light badge badge-dark">Goals List</h1>
        <table className="table table-dark  table-striped font-goal-task">
          <thead className="font-headers text-light align-middle text-center">
            <td>Goal</td>
            <td>Due Date</td>
            <td>Accomplished</td>
            <td>Tags</td>
          </thead>
          <tbody>{listGoals}</tbody>
        </table>
        </div>

        {this.state.modalHere && (
          <Modal show={this.state.modalHere} onHide={this.closeModal}>
            <form onSubmit={this.handleSubmit}>
              <Modal.Header closeButton>
                <Modal.Title className="text-dark font-welcome-buttons">Update Goal</Modal.Title>
              </Modal.Header>
              <Modal.Body class="row mx-3 g-1 font-welcome-text">
                <label htmlFor="goal">Goal: </label><br></br>
                <input
                  type="text"
                  id="goal"
                  name="goal"
                  onChange={(e) => this.handleChange(e)}
                  value={this.state.goal}
                /><br></br>
              <label htmlFor="dueDate">Due Date: </label><br></br>
                <input
                  type="date"
                  id="dueDate"
                  name="dueDate"
                  onChange={(e) => this.handleChange(e)}
                  value={this.state.dueDate}
                />
                <label htmlFor="tags">Tags: </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  onChange={(e) => this.handleChange(e)}
                  value={this.state.tags}
                />
              <label class="text-center" htmlFor="accomplished">Accomplished: </label>
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
              </Modal.Body>
              <br></br>
              <Modal.Footer>
                <Button variant="secondary font-signup-buttons" onClick={this.closeModal}>
                  Close
                </Button>
                <input
                  className="btn btn-dark text-light font-signup-buttons"
                  type="submit"
                  value="Update Goal"
                />
              </Modal.Footer>
            </form>
          </Modal>
        )}
      </>
    );
  }
}

export default GoalsList;
