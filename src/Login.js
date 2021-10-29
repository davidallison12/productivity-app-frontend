import React, { Component } from 'react';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

handleChange = (e) => {
  this.setState({
    [e.target.name] : e.target.value
  })
}

handleSubmit = (e) => {
  this.loginUser()
}


  render() {
    return (
      <div className="App">
        <h1>Please Log In</h1>
        <form onSubmit={this.handleSubmit}>
          <label>
            <p>Email</p>
            <input type="email" name="email" onChange={e => this.handleChange(e)} value={this.state.email} required/>
          </label>
          <label>
            <p>Password</p>
            <input type="password" name="password" onChange={e => this.handleChange(e)} value={this.state.password} required/>
          </label>
          <button type="submit">Log In</button>
        </form>
      </div>
    );
  }
}

export default Login;
