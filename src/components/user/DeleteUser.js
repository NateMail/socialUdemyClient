import React, { Component } from 'react';

export default class DeleteUser extends Component {
  deleteAccount = () => {
    console.log('deleteAccount');
  };

  deletConfirmed = () => {
    let answer = window.confirm(
      'Are you sure you want to delete your account?'
    );
    if (answer) {
      this.deleteAccount();
    }
  };
  render() {
    return (
      <div>
        <button
          className="btn btn-raised btn-danger"
          onClick={this.deletConfirmed}
        >
          Delete Profile
        </button>
      </div>
    );
  }
}
