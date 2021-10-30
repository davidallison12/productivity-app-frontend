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
      <>
        <div class="container">
          <h1 class="font-welcome">WELCOME TO ACCOMPLI</h1>
          <h5>Sign in or login to get started meeting your goals!</h5>

          <div>
            <button
              type="button"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#signUpModal"
            >
              SIGN UP
            </button>
            <button
              type="button"
              class="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#loginModal"
            >
              LOGIN
            </button>
          </div>

          {/* Sign Up Modal */}
          <div
            class="modal fade"
            id="signUpModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <form onSubmit={this.registerUser}>
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      Modal title
                    </h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
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
                    <label htmlFor="confirmedPassword">
                      Confirm Password:
                    </label>
                    <input
                      type="text"
                      id="confirmedPassword"
                      name="confirmedPassword"
                      onChange={(e) => this.handleChange(e)}
                      value={this.state.confirmedPassword}
                    />
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <input
                className="btn btn-primary"
                type="submit"
                value="Sign Up"
              />
                  </div>
                </form>
              </div>
            </div>
          </div>


          {/* Login Modal */}

          <div
            class="modal fade"
            id="loginModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <form onSubmit={this.props.loginUser}>
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      Modal title
                    </h5>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
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
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <input
                className="btn btn-primary"
                type="submit"
                value="Login"
              />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Welcome;
