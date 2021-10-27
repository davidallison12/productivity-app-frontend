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

    handleChange = (event) => {
        this.setState({
           [event.target.name] : event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()

        fetch(this.props.baseUrl + '/tasks', {
            method: 'POST',
            body: JSON.stringify({
                task: this.state.task,
                dueDate: this.state.dueDate
            }),
           headers: {
            'Content-Type': 'application/json'
           } 
        }).then((res) => {
            return res.json()
        }).then((data) => {
            console.log(data)
            this.props.addTask(data)
        })
    }



    render() { 
        return ( 
            <div>
                <h1>Create New Task</h1>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="task">Task: </label>
                    <input type="text" id="task" name="task" onChange={(e) => this.handleChange(e)} value={this.state.task} />
                    <label>Due Date: </label>
                    <input type="date" id="dueDate" name="dueDate" onChange={(e) => this.handleChange(e)} value={this.state.dueDate} />
                    <input type="submit" value="Add New Task" />    
                </form>
            </div>
         );
    }
}
 
export default TasksForm;