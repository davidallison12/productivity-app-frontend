import React, { Component } from 'react';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() {
        return (
            <div className="App">
                <h1>Please Log In</h1>
                <form>
                  <label>
                    <p>Email</p>
                    <input type="email" name="email" required/>
                  </label>
                  <label>
                    <p>Password</p>
                    <input type="text" name="password" required/>
                  </label>
                  <button type="submit">Log In</button>
                </form>
            </div>
         );
    }
}

export default Login;
