import React, { Component } from 'react';



class GoalsList extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            modalHere: false,
            currentGoal: {},
         }
    }

    showModal = (goal) => {
        console.log(goal)
        this.setState({
            modalHere: true,
            currentGoal: goal,
            goal: goal.goal,
            dueDate: '',
            accomplished: false,
            tags:'',
        })
    }

    handleChange = (event) => {
        console.log(event.target)
        this.setState({
          [event.target.name]: event.target.value,
        });
      };


      handleSubmit = async (event) => {
        event.preventDefault();
        // fetch
        console.log('Something happened')
        console.log(event.target)
        const url = this.props.baseUrl + "/goals/" + this.state.currentGoal._id;
        try {
          const response = await fetch(url, {
            method: "PUT",
            body: JSON.stringify({
              goal: this.state.goal,
              dueDate: this.state.dueDate,
              tags: this.state.tags,
              accomplished: this.state.accomplished,
            }),
            headers: {
              "Content-Type": "application/json",
            },
            // credentials: "include",
          });
          if (response.status === 200) {
            const updatedGoal = await response.json();
            console.log(updatedGoal)
            const findIndex = this.props.goals.findIndex(
              (goal) => goal._id === updatedGoal.id
            );
            const copyGoals = [...this.props.goals];
            copyGoals[findIndex] = updatedGoal;
            this.props.handleData(copyGoals)
          } else {
              response.json().then((data)=> {
                console.log(data)
              })
          }
          this.setState({
              modalHere: false
          })
          this.props.getGoals()
        } catch (err) {
          console.log("Error => ", err);
        }
      };


    

    render() { 
        const listGoals = this.props.goals.map((goal) => {
            return(
                <tr key={goal._id}>
                <td>{goal.goal}</td>
                <td>{goal.dueDate}</td>
                <td>{goal.accomplished ? 'true' : 'false'}</td>
                <td>{goal.tags}</td>
                <td><button onClick={() => {this.showModal(goal)}} > EDIT
                    </button></td>
                </tr>
            )
        })
    

        return ( 
            <div>
                <h1>Goals List</h1>
                <table>
                    <thead>
                       <th>Goal</th>
                       <th>Due Date</th>
                       <th>Accomplished</th>
                       <th>Tags</th>
                       <th></th>
                    </thead>
                    <tbody>
                        {listGoals}
                    </tbody>
                </table>

                {this.state.modalHere &&
                
                <div class="modal-dialog">
                  <div class="modal-content">
                      <form onSubmit={this.handleSubmit}>
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
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                        <input type="submit" className="btn btn-primary" value="Add New Goal" />
                    </div>
                    </form>
                  </div>
                </div>

                }
            </div>

         );
    }
}
 
export default GoalsList;