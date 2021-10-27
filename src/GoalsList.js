import React, { Component } from 'react';



class GoalsList extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    render() { 
        const listGoals = this.props.goals.map((goal) => {
            return(
                <tr>
                <td>{goal.goal}</td>
                <td>{goal.dueDate}</td>
                <td>{goal.accomplished ? 'true' : 'false'}</td>
                <td>{goal.tags}</td>
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
                    </thead>
                    <tbody>
                        {listGoals}
                    </tbody>
                </table>
            </div>

         );
    }
}
 
export default GoalsList;