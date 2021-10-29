import "./App.css";
import React, { Component } from "react";
import Nav from "./Nav";
import GoalsForm from "./GoalsForm";
import TasksForm from "./TasksForms";
import GoalsList from "./GoalsList";
import TasksList from "./TasksList";
import Welcome from "./Welcome";

let baseUrl = process.env.BASE_URL || "http://localhost:3003";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userData: [],
      goalsData: [],
      tasksData: [],
      userLoggedIn: true, // If false, will be sent to welocome page to sign up and log in. If true, will be sent to page.
      goalsFormModal: false,
      tasksFormModal: false,
    };
  }

  // GOALS CRUD

  getGoals = () => {
    // fetch
    fetch(baseUrl + "/goals")
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
    fetch(baseUrl + "/tasks")
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
  }

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
            />

            {this.state.goalsFormModal && (
              <>
                <GoalsForm baseUrl={baseUrl} addGoals={this.addGoal} />
              </>
            )}

            {this.state.tasksFormModal && (
              <>
                <TasksForm baseUrl={baseUrl} addTask={this.addTask} />
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
            />
            <TasksList
              tasks={this.state.tasksData}
              handleEditedTaskData={this.handleEditedTaskData}
              baseUrl={baseUrl}
              getTasks={this.getTasks}
              deleteTask={this.deleteTask}
            />
          </>
        ) : (
          <Welcome />
        )}
      </>
    );
  }
}

export default App;
