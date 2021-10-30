import "./App.css";
import React, { Component } from "react";
import Nav from "./Nav";
import GoalsForm from "./GoalsForm";
import TasksForm from "./TasksForms";
import GoalsList from "./GoalsList";
import TasksList from "./TasksList";
import Welcome from "./Welcome";


let baseUrl = process.env.REACT_APP_BASEURL || "http://localhost:3003";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: [],
      goalsData: [],
      tasksData: [],
      userLoggedIn: false, // If false, will be sent to welocome page to sign up and log in. If true, will be sent to page.
      goalsFormModal: false,
      tasksFormModal: false,
    };
  }

  // GOALS CRUD

  getGoals = () => {
    // fetch
    fetch(baseUrl + "/goals", {
      credentials: "include"
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          return [];
        }
      })
      .then((data) => {
        console.log(data);
        this.setState({
          goalsData: data,
        });
      });
  };

  // Add Goals
  addGoal = (newGoal) => {
    const copyGoals = [...this.state.goalsData];
    copyGoals.push(newGoal);
    this.setState({
      goalsData: copyGoals,
    });
  };

  //Edit Goals
  handleEditedData = (data) => {
    this.setState({
      goalsData: data,
    });
  };

  // Delete Goals
  deleteGoal = (id) => {
    fetch(baseUrl + "/goals/" + id, {
      method: "DELETE",
      credentials: "include"
    }).then((res) => {
      console.log(res);
      const findIndex = this.state.goalsData.findIndex(
        (goal) => goal._id === id
      );
      const copyGoals = [...this.state.goalsData];
      copyGoals.splice(findIndex, 1);
      this.setState({
        goalsData: copyGoals,
      });
    });
  };

  //======= TASKS CRUD FUNCTIONS =========
  getTasks = () => {
    fetch(baseUrl + "/tasks", {
      credentials: "include"
    })
      .then((res) => {
        if (res.status === 200) {
          return res.json();
        } else {
          return [];
        }
      })
      .then((data) => {
        console.log(data);
        this.setState({
          tasksData: data,
        });
      });
  };

  // Add Task
  addTask = (newTask) => {
    const copyTasks = [...this.state.tasksData];
    copyTasks.push(newTask);
    this.setState({
      tasks: copyTasks,
    });
    this.getTasks();
  };

  // Edit Task
  handleEditedTaskData = (data) => {
    this.setState({
      tasksData: data,
    });
  };

  // Delete Task
  deleteTask = (id) => {
    fetch(baseUrl + "/tasks/" + id, {
      method: "DELETE",
      credentials: "include"
    }).then((res) => {
      console.log(res);
      const findIndex = this.state.tasksData.findIndex(
        (task) => task._id === id
      );
      const copyTasks = [...this.state.tasksData];
      copyTasks.splice(findIndex, 1);
      this.setState({
        tasksData: copyTasks,
      });
      this.getTasks();
    });
  };


  //====== USER ========
  registerUser = async (event) => {
    console.log('hit sign up')
    event.preventDefault()
    const url = baseUrl + '/users/signup'
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({
          email: event.target.email.value,
          username: event.target.username.value,
          password: event.target.password.value,
          confirmedPassword: event.target.confirmedPassword.value

        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (response.status === 200) {
        alert('User is registered!')
      } else {
        response.json().then((data) => {
          console.log(data);
        })}
    }
    catch (err) {
      console.log('Error => ', err);
    }
  }


  loginUser = async (event) => {
    console.log('loginUser')
    event.preventDefault()
    const url = baseUrl + '/users/login'
    const loginBody = {
      username: event.target.username.value,
      password: event.target.password.value
    }
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(loginBody),
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: "include"
      })
      console.log(response)
      console.log("BODY: ", response.body)

      if (response.status === 200) {
        this.setState({
          userLoggedIn: true
        })
      } else {
        response.json().then((data) => {
          console.log(data);
        })}
    }
    catch (err) {
      console.log('Error => ', err)
      alert('Error: Unable to log in at this time.')
    }
  }

  // handleLogout = () => {
  //   this.setState({
  //     userLoggedIn: false
  //   })
  // }

  logout =  (event) => {
    event.preventDefault()
    const url = baseUrl + '/users/logout'
    const response = fetch(url, {
      method: "DELETE",
      credentials: "include"
    }).then((response => {
      this.setState({
        userLoggedIn: false
      })
    }))
    // catch (err) {
    //   console.log('Error =>', err)
    //   alert('Error: Unable to log out at this time.')
    // }
  }


  //======= MODALS ========
  toggleGoalModal = () => {
    this.setState({
      goalsFormModal: !this.state.goalsFormModal,
    });
  };

  toggleTaskModal = () => {
    this.setState({
      tasksFormModal: !this.state.tasksFormModal,
    });
  };




  componentDidMount() {
    this.getGoals();
    this.getTasks();
  };



  render() {
    return (
      <>
        {/*Conditional for User Login*/}
        {/* If user not logged in, will go to welcome page */}
        {/* If logged in, will navigate to main dashboard */}
        {this.state.userLoggedIn ? (
          <>
            <Nav
              toggleGoalModal={this.toggleGoalModal}
              toggleTaskModal={this.toggleTaskModal}
              logout={this.logout}
            />

            {this.state.goalsFormModal && (
              <>
                <GoalsForm baseUrl={baseUrl} addGoals={this.addGoal} goalsFormModal={this.state.goalsFormModal} toggleGoalModal={this.toggleGoalModal} />
              </>
            )}

            {this.state.tasksFormModal && (
              <>
                <TasksForm baseUrl={baseUrl} addTask={this.addTask}  tasksFormModal={this.state.tasksFormModal} toggleTaskModal={this.toggleTaskModal} />
              </>
            )}



            {/* <Calendar /> */}
            {/* {/* <GoalsForm baseUrl={baseUrl} addGoals={this.addGoal} /> */}

            <GoalsList
              goals={this.state.goalsData}
              goalSubmit={this.handleGoalSubmit}
              handleData={this.handleEditedData}
              baseUrl={baseUrl}
              getGoals={this.getGoals}
              deleteGoal={this.deleteGoal}
            /><br></br>
            <TasksList
              tasks={this.state.tasksData}
              handleEditedTaskData={this.handleEditedTaskData}
              baseUrl={baseUrl}
              getTasks={this.getTasks}
              deleteTask={this.deleteTask}
            />
          </>
        ) : (
          <Welcome  loginUser={this.loginUser} registerUser={this.registerUser} baseUrl={baseUrl}/>
        )}
      </>
    );
  }
}

export default App;
