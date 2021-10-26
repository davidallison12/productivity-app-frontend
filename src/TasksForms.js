import React, { Component } from 'react';



class TasksForm extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            task: '',
            dueDate: '',
        }
        
        // this.handleGoalChange = this.handleGoalChange.bind(this);
    }

    handleGoalChange = (event) => {
        // console.log(event.target.value)
        
        this.setState = ({
           task : event.target.value
        })
        // console.log(this.state.goal)
    }



    render() { 
        // console.log(this.state.goal)

        return ( 
            <div>
                <h1>Create New Goal</h1>
                <form onSubmit="">
                    <label htmlFor="goal">Task: </label>
                    <input type="text" id="task" name="task" onChange={(e) => this.handleGoalChange(e)} value={this.state.task} />
                    <label>Due Date: </label>
                    {/* <input type="text" id="name" name="dueDate" onChange={(e) => this.handleChange(e)} value={this.state.dueDate} /> */}
                    <input type="submit" value="Add New Goal" />    
                </form>
            </div>
         );
    }
}
 
export default TasksForm;