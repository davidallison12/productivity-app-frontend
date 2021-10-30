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
        <tr class="border-light" key={goal._id}>
          <td>{goal.goal}</td>
          <td>{goal.dueDate}</td>
          <td>{goal.accomplished ? "true" : "false"}</td>
          <td>{goal.tags}</td>
          <td>
            <button
              type="button"
              class="btn btn-light"
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
      <div class="container">
        <br></br>
        <h1 class="font-link text-light">Goals List</h1>
        <table class="table table-dark  table-striped table-bordered font-goal-task">
          <thead class="font-headers text-light">
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
                <Modal.Title>Update Goal</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <label htmlFor="goal">Goal: </label>
                <input
                  type="text"
                  id="goal"
                  name="goal"
                  onChange={(e) => this.handleChange(e)}
                  value={this.state.goal}
                />
                <label htmlFor="dueDate">Due Date: </label>
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
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={this.closeModal}>
                  Close
                </Button>
                <input
                  className="btn btn-primary"
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
