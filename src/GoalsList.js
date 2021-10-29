import React, { Component } from "react";

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
    event.preventDefault();

      this.setState({
          modalHere: false
      })
  }

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
        <tr key={goal._id}>
          <td>{goal.goal}</td>
          <td>{goal.dueDate}</td>
          <td>{goal.accomplished ? "true" : "false"}</td>
          <td>{goal.tags}</td>
          <td>
            <button
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
      <div>
        <h1>Goals List</h1>
        <table>
          <thead>
            <th>Goal</th>
            <th>Due Date</th>
            <th>Accomplished</th>
            <th>Tags</th>
            <th> </th>
            <th> </th>
          </thead>
          <tbody>{listGoals}</tbody>
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
                    aria-label="Close"
                    onClick={(e)=> {this.closeModal(e)}}
                  >
                  ></button>
                </div>
                <div className="modal-body">
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
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={(e)=> {this.closeModal(e)}}
                  >
                    Close
                  </button>
                  <input
                    type="submit"
                    className="btn btn-primary"
                    value="Edit Goal"
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

export default GoalsList;
