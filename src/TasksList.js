import React, { Component } from 'react';



class TasksList extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    render() { 
        const listTasks = this.props.tasks.map((task) => {
            return(
                <tr key={task._id}>
                <td>{task.task}</td>
                <td>{task.dueDate}</td>
                <td>{task.tags}</td>
                <td>{task.accomplished ? 'true' : 'false'}</td>
                </tr>
            )
        })
    

        return ( 
            <div>
                <h1>Task List</h1>
                <table>
                    <thead>
                       <th>Task</th>
                       <th>Due Date</th>
                       <th>Created On</th>
                       <th>Accomplished</th>
                    </thead>
                    <tbody>
                        {listTasks}
                    </tbody>
                </table>
            </div>

         );
    }
}
 
export default TasksList;