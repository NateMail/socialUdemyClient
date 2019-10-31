import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

class Signin extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      error: '',
      redirectToRefer: false
    };
  }

  handleChange = name => event => {
    this.setState({ error: '' });
    this.setState({ [name]: event.target.value });
  };

  authenticate(jwt, next) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('jwt', JSON.stringify(jwt));
      next();
    }
  }

  clickSubmit = event => {
    event.preventDefault();

    const { email, password } = this.state;

    const user = {
      email,
      password
    };
    // console.log(user);
    this.signin(user).then(data => {
      if (data.error) {
        this.setState({ error: data.error });
      } else {
        this.authenticate(data, () => {
          this.setState({ redirectToRefer: true });
        });
      }
    });
  };

  signin = user => {
    return fetch('http://localhost:8080/signin', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(response => {
        return response.json();
      })
      .catch(error => console.log(error));
  };

  render() {
    const { email, password, error, redirectToRefer } = this.state;
    if (redirectToRefer) {
      return <Redirect to="/" />;
    }
    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Sign In</h2>

        <div
          className="alert alert-primary"
          style={{ display: error ? '' : 'none' }}
        >
          {error}
        </div>

        <form>
          <div className="form-group">
            <label className="text-muted">Email</label>
            <input
              onChange={this.handleChange('email')}
              type="text"
              className="form-control"
              value={email}
            />
          </div>
          <div className="form-group">
            <label className="text-muted">Password</label>
            <input
              onChange={this.handleChange('password')}
              type="password"
              className="form-control"
              value={password}
            />
          </div>
          <button
            onClick={this.clickSubmit}
            className="btn btn-raised btn-primary"
          >
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default Signin;
