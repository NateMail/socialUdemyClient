import React, { Component } from 'react';
import { isAuthenticated } from '../../auth';
import { read, update } from './apiUser';
import { Redirect } from 'react-router-dom';

class EditProfile extends Component {
  constructor() {
    super();
    this.state = {
      id: '',
      name: '',
      email: '',
      password: '',
      redirectToProfile: false,
      error: ''
    };
  }

  init = userId => {
    const token = isAuthenticated().token;
    read(userId, token).then(data => {
      if (data.error) {
        this.setState({ redirectToProfile: true });
      } else {
        this.setState({
          id: data._id,
          name: data.name,
          email: data.email,
          error: ''
        });
      }
    });
  };

  componentDidMount() {
    const userId = this.props.match.params.userId;
    this.init(userId);
  }

  isValid = () => {
    const { name, email, password } = this.state;
    if (name.length === 0) {
      this.setState({ error: 'Name is required' });
      return false;
    }
    if (!/^\w+([\.-]\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      this.setState({ error: 'A valid Email is required' });
      return false;
    }
    if (password.length >= 1 && password.length <= 5) {
      this.setState({
        error: 'Password must be 6 characters long and contain a number'
      });
      return false;
    }
    return true;
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  clickUpdate = event => {
    event.preventDefault();
    if (this.isValid()) {
      const { name, email, password } = this.state;
      const user = {
        name,
        email,
        password: password || undefined
      };
      const userId = this.props.match.params.userId;
      const token = isAuthenticated().token;

      update(userId, token, user).then(data => {
        if (data.error) this.setState({ error: data.error });
        else
          this.setState({
            redirectToProfile: true
          });
      });
    }
  };

  editProfileForm = (name, email, password) => (
    <form>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          onChange={this.handleChange('name')}
          type="text"
          className="form-control"
          value={name}
        />
      </div>
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
      <button onClick={this.clickUpdate} className="btn btn-raised btn-primary">
        Update
      </button>
    </form>
  );

  render() {
    const { name, id, email, password, redirectToProfile, error } = this.state;

    if (redirectToProfile) {
      return <Redirect to={`/user/${id}`} />;
    }

    return (
      <div className="container">
        <h2 className="mt-5 mb-5">Edit Profile</h2>
        <div
          className="alert alert-primary"
          style={{ display: error ? '' : 'none' }}
        >
          {error}
        </div>
        {this.editProfileForm(name, email, password)}
      </div>
    );
  }
}

export default EditProfile;
