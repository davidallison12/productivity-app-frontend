import React, { Component } from "react";

class Welcome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signUpModal: false,
      loginModal: false,
      email: '',
      username: '',
      password: '',
      confirmedPassword: ''
    };
  }

  toggleSignUpModal = (event) => {
    event.preventDefault();

    this.setState({
      signUpModal: !this.state.signUpModal,
    });
  };

  toggleLoginModal = (event) => {
    event.preventDefault();

    this.setState({
      loginModal: !this.state.loginModal,
    });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  registerUser = async (event) => {
    console.log('hit sign up')
    event.preventDefault()
    const url = this.props.baseUrl + '/users/signup'
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
        this.setState({
          email: '',
          username: '',
          password: '',
          confirmedPassword: ''
        })
        this.toggleSignUpModal()
      } else {
        response.json().then((data) => {
          console.log(data);
        })}
    }
    catch (err) {
      console.log('Error => ', err);
    }
  }


    render() {
        return (
            <div className="welcome-margin">
            <div className="container position-absolute">
            <h1 className="font-welcome">WELCOME TO ACCOMPLI</h1>
            <h5 className="font-welcome-text">Sign up or login to get started meeting your goals!</h5>



            <div className="">
            <button type="button" className="btn bg-dark text-light font-welcome-buttons" data-bs-toggle="modal" data-bs-target="#signUpModal">SIGN UP</button>
            <button type="button" className="btn bg-light font-welcome-buttons" data-bs-toggle="modal" data-bs-target="#loginModal">LOGIN</button>
            </div>

            {/* Sign Up Modal */}
            <div className="modal fade" id="signUpModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
              <div className="modal-content bg-light">
                <form onSubmit={this.registerUser}>
                <div className="modal-header">
                  <h5 className="modal-title text-dark font-welcome-buttons" id="exampleModalLabel">Hello, please sign up for Accompli!</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body row g-2 font-welcome-text">
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
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary font-signup-buttons" data-bs-dismiss="modal">Close</button>
                  <input type="submit" className="btn btn-dark text-light font-signup-buttons" data-bs-dismiss="modal" value="Sign Up" />
                </div>
                </form>
              </div>
            </div>
          </div>


          {/* Login Modal */}

          <div
            className="modal fade"
            id="loginModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <form onSubmit={this.props.loginUser}>
                <div className="modal-header">
                  <h5 className="modal-title font-welcome-buttons" id="exampleModalLabel">Welcome back, Please log in!</h5>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body row g-2 font-welcome-text">
                  <label htmlFor="username">Username: </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    onChange={(e) => this.handleChange(e)}
                  />
                  <br></br>
                  <label htmlFor="password">Password: </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    onChange={(e) => this.handleChange(e)}
                  />
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary font-signup-buttons" data-bs-dismiss="modal">Close</button>
                  <input type="submit" className="btn btn-dark text-light font-signup-buttons" data-bs-dismiss="modal" value="Login" />
                </div>
              </form>
              </div>
            </div>
            </div>
            </div>
          </div>
         );
    }
}

export default Welcome;
