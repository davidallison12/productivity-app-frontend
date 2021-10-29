import React, { Component } from 'react';


class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() {
        return (
            <div className="App">
                <h1>Please Sign Up</h1>
                <form>
                  <label>
                    <p>Email</p>
                    <input type="text"/>
                  </label>
                  <label>
                    <p>Password</p>
                    <input type="text"/>
                  </label>
                  <label>
                    <p>Confirm Password</p>
                    <input type="text"/>
                  </label>
                  <button type="submit">Sign Up</button>
                </form>
            </div>
         );
    }
}

export default SignUp;
