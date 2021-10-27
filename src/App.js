import './App.css';
import React, { Component } from 'react';
import Nav from './Nav';
import GoalsForm from './GoalsForm';
import TasksForm from './TasksForms';
import GoalsList from './GoalsList';
import TasksList from './TasksList';

let baseUrl = process.env.BASE_URL || "http://localhost:3003";



class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      userData: [],
      goalsData: [],
      tasksData: [],
     }
  }

  
  
  
// GOALS CRUD

getGoals = () => {
  // fetch 
  fetch(baseUrl + '/goals')
  .then((res) => {
    if (res.status === 200) {
      return res.json()
    } else {
      return []
    }
  })
  .then((data) => {
    console.log(data)
    this.setState({
      goalsData: data
    })
  })
}


 // Add Goals
  addGoal = (newGoal) => {
  const copyGoals = [...this.state.goalsData]
  copyGoals.push(newGoal)
  this.setState({
    goalsData: copyGoals
  })
}


//Edit Goals






// Delete Goals 
deleteGoal = (id) => {
  fetch(baseUrl + '/goals/' + id, {
    method: "DELETE"
  }).then((res) => {
    console.log(res)
    const findIndex = this.state.goalsData.findIndex((goal) => goal._id === id)
    const copyGoals = [...this.state.goalsData]
    copyGoals.splice(findIndex, 1)
    this.setState({
      goalsData: copyGoals
    })
  })
}


//======= TASKS CRUD FUNCTIONS =========
getTasks = () => {
  fetch(baseUrl + '/tasks')
  .then((res) => {
    if(res.status === 200) {
      return res.json()
    } else {
      return[]
    }
  }).then((data) => {
    console.log(data)
    this.setState({
      tasksData: data
    })
  })
}

// Add Task
addTask = (newTask) => {
  const copyTasks = [...this.state.tasksData]
  copyTasks.push(newTask)
  this.setState({
    tasks: copyTasks
  })
}


// Edit Task


// Delete Task
deleteTask = (id) => {
  fetch(baseUrl + '/tasks/' + id, {
    method: "DELETE"
  }).then((res) => {
    console.log(res)
    const findIndex = this.state.tasksData.findIndex((task) => task._id === id)
    const copyTasks = [...this.state.tasksData]
    copyTasks.splice(findIndex, 1)
    this.setState({
      tasksData: copyTasks
    })
  })
}

componentDidMount() {
  this.getGoals()
  this.getTasks()
}


  render() { 
    return ( 
      <>
      <h1>WELCOME TO THE APP</h1>
      <Nav />
      <GoalsForm baseUrl={baseUrl} addGoals={this.addGoal} />
      <TasksForm baseUrl={baseUrl} addTask={this.addTask} />
      <GoalsList goals={this.state.goalsData} />
      <TasksList tasks={this.state.tasksData}/>
      </>
     );
  }
}
 
export default App;
