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
            <>
            <h1>WELCOME TO ACCOMPLI</h1>
            <h5>Sign in or login to get started meeting your goals!</h5>



            <div>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#signUpModal">SIGN UP</button>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#loginModal">LOGIN</button>
            </div>

            {/* Sign Up Modal */}
            <div class="modal fade" id="signUpModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
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
                    type="text"
                    id="password"
                    name="password"
                    onChange={(e) => this.handleChange(e)}
                    value={this.state.password}
                  />
                  <br></br>
                   <label htmlFor="confirmedPassword">Confirm Password: </label>
                  <input
                    type="text"
                    id="confirmedPassword"
                    name="confirmedPassword"
                    onChange={(e) => this.handleChange(e)}
                    value={this.state.confirmedPassword}
                  />

                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
                </div>
              </div>
            </div>
          </div>



          <div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
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
                    type="text"
                    id="password"
                    name="password"
                    onChange={(e) => this.handleChange(e)}
                    value={this.state.password}
                  />
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
                </div>
              </div>
            </div>
            </div>
            </>
         );
    }
}

export default Welcome;
