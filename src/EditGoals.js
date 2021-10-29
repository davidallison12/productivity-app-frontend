import React, { Component } from "react";

class EditGoals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      goal: "",
      dueDate: "",
      tags: "",
    };

    // this.handleGoalChange = this.handleGoalChange.bind(this);
  }

  //Handles Changes to Inputs
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    // fetch

    const url = this.props.baseUrl + "/goals/" + this.state.goalToBeEdited._id;
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify({
          goal: event.target.goal.value,
          dueDate: event.target.dueDate.value,
          tags: event.target.tags.value,
          accomplished: event.target.accomplished.value,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (response.status === 200) {
        const updatedGoal = await response.json();
        const findIndex = this.state.goalsData.findIndex(
          (goal) => goal._id === updatedGoal.id
        );
        const copyGoals = [...this.state.goalsData];
        copyGoals[findIndex] = updatedGoal;
        this.setState({
          goalsData: copyGoals,
        });
      }
    } catch (err) {
      console.log("Error => ", err);
    }
  };

  render() {
    console.log(this.state.goal);
    return (
    //   <div>
    //     <h1>Edit Goal</h1>
    //     <form >
    //       <label htmlFor="goal">Goal: </label>
    //       <input
    //         type="text"
    //         id="goal"
    //         name="goal"
    //         onChange={(e) => this.handleChange(e)}
    //         value={this.state.goal}
    //       />
    //       <label>Due Date: </label>
    //       <input
    //         type="date"
    //         id="name"
    //         name="dueDate"
    //         onChange={(e) => this.handleChange(e)}
    //         value={this.state.dueDate}
    //       />
    //       <label>Tags: </label>
    //       <input
    //         type="text"
    //         id="name"
    //         name="tags"
    //         onChange={(e) => this.handleChange(e)}
    //         value={this.state.tags}
    //       />
    //       <input type="submit" value="Add New Goal" />
    //     </form>
    //   </div>
    <div class="modal fade" id="editGoalsModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
        <form>
      <div class="modal-header">
        <h5 class="modal-title" id="editGoalsModalLabel">Edit Goals</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      
          <label htmlFor="goal">Goal: </label>
          <input
            type="text"
            id="goal"
            name="goal"
            onChange={(e) => this.handleChange(e)}
            // value={this.props.goal}
          />
          <label>Due Date: </label>
          <input
            type="date"
            id="name"
            name="dueDate"
            onChange={(e) => this.handleChange(e)}
            // value={this.props.dueDate}
          />
          <label>Tags: </label>
          <input
            type="text"
            id="name"
            name="tags"
            onChange={(e) => this.handleChange(e)}
            // value={this.state.tags}
          />
          <input type="submit" value="Add New Goal" />
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
      </form>
    </div>
  </div>
</div>
    );
  }
}

export default EditGoals;

