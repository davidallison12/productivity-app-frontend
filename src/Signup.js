import React, { Component } from 'react';


class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmPassword: ''
    }
  }

handleChange = (e) => {
  this.setState({
    [e.target.name] : e.target.value
  })
}

handleSubmit = (e) => {
  this.register()
}

  render() {
    return (
      <div className="App">
          <h1>Please Sign Up</h1>
          <form>
            <label>
              <p>Email</p>
              <input type="email" name="email" placeholder="Email address" onChange={e => this.state.email} required/>
            </label>
            <label>
              <p>Password</p>
              <input type="password" name="password" placeholder="Password" onChange={e => this.state.password} required/>
            </label>
            <label>
              <p>Confirm Password</p>
              <input type="password" name="confirmPassword" placeholder="Confirm password" onChange={e => this.state.confirmPassword} required/>
            </label>
            <button type="submit">Sign Up</button>
          </form>
      </div>
   );
  }
}

export default SignUp;
