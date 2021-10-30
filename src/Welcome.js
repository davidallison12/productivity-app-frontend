import React, { Component } from 'react';



class Welcome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signUpModal: false,
            loginModal: false
         }
    }

    toggleSignUpModal = (event) => {
        event.preventDefault()

        this.setState({
            signUpModal: !this.state.signUpModal
        })

    }

    toggleLoginModal = (event) => {
        event.preventDefault()

        this.setState({
            loginModal: !this.state.loginModal
        })

    }

    handleChange = (event) => {
        this.setState({
           [event.target.name] : event.target.value
        })
    }



    render() {
        return (
            <div class="welcome-margin">
            <div class="container position-absolute">
            <h1 class="font-welcome">WELCOME TO ACCOMPLI</h1>
            <h5 class="font-welcome-text">Sign up or login to get started meeting your goals!</h5>



            <div class="">
            <button type="button" class="btn bg-dark text-light font-welcome-buttons" data-bs-toggle="modal" data-bs-target="#signUpModal">SIGN UP</button>
            <button type="button" class="btn bg-light font-welcome-buttons" data-bs-toggle="modal" data-bs-target="#loginModal">LOGIN</button>
            </div>

            {/* Sign Up Modal */}
            <div class="modal fade" id="signUpModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content bg-light">
                <div class="modal-header">
                  <h5 class="modal-title text-dark font-welcome-buttons" id="exampleModalLabel">Hello, please sign up for Accompli!</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body row g-2 font-welcome-text">
                <label htmlFor="email">Email Address: </label>
                  <input
                    type="text"
                    id="email"
                    name="email"
                    onChange={(e) => this.handleChange(e)}
                    value={this.state.email}
                  />
                  <br></br>
                  <label htmlFor="username">Username: </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    onChange={(e) => this.handleChange(e)}
                    value={this.state.username}
                  />
                  <br></br>
                  <label htmlFor="password">Password: </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    onChange={(e) => this.handleChange(e)}
                    value={this.state.password}
                  />
                  <br></br>
                   <label htmlFor="confirmedPassword">Confirm Password: </label>
                  <input
                    type="password"
                    id="confirmedPassword"
                    name="confirmedPassword"
                    onChange={(e) => this.handleChange(e)}
                    value={this.state.confirmedPassword}
                  />

                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary font-signup-buttons" data-bs-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-dark text-light font-signup-buttons" data-bs-dismiss="modal">Sign Up</button>
                </div>
              </div>
            </div>
          </div>



          <div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title font-welcome-buttons" id="exampleModalLabel">Welcome back, Please log in!</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body row g-2 font-welcome-text">
                  <label htmlFor="username">Username: </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    onChange={(e) => this.handleChange(e)}
                    value={this.state.username}
                  />
                  <br></br>
                  <label htmlFor="password">Password: </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    onChange={(e) => this.handleChange(e)}
                    value={this.state.password}
                  />
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary font-signup-buttons" data-bs-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-dark text-light font-signup-buttons" data-bs-dismiss="modal">Login</button>
                </div>
              </div>
            </div>
            </div>
            </div>
          </div>
         );
    }
}

export default Welcome;
