import React, { Component } from 'react';



class GoalsForm extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            goal: '',
            dueDate: '',
            tags: '',
        }
        
        // this.handleGoalChange = this.handleGoalChange.bind(this);
    }

    //Handles Changes to Inputs
    handleChange = (event) => { 
        this.setState({
           [event.target.name] : event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault()
        // fetch

        fetch(this.props.baseUrl + '/goals', {
            method: 'POST',
            body: JSON.stringify({
                goal: this.state.goal,
                dueDate: this.state.dueDate,
                tags: this.state.tags
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            return res.json()
        }).then(data => {
            console.log(data)
            this.props.addGoals(data)
            this.setState({
                goal: '',
                dueDate: '',
                accomplished: false,
                tags: '',
            })
        })
    }



    render() { 
        console.log(this.state.goal)
        return ( 
            <div>
                <h1>Create New Goal</h1>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="goal">Goal: </label>
                    <input type="text" id="goal" name="goal" onChange={(e) => this.handleChange(e)} value={this.state.goal}/>
                    <label>Due Date: </label>
                    <input type="date" id="name" name="dueDate" onChange={(e) => this.handleChange(e)} value={this.state.dueDate} />
                    <label>Tags: </label>
                    <input type="text" id="name" name="tags" onChange={(e) => this.handleChange(e)} value={this.state.tags} />
                    <input type="submit" value="Add New Goal" />



                </form>
            </div>
         );
    }
}
 
export default GoalsForm;