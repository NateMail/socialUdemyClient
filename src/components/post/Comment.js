import React, { Component } from 'react';
import { comment, uncomment } from './apiPost';
import { isAuthenticated } from '../../auth';
import { Link } from 'react-router-dom';
import DefaultProfile from '../../images/avatar.jpg';

class Comment extends Component {
  state = {
    text: ''
  };

  handleChange = event => {
    this.setState({
      text: event.target.value
    });
  };

  addComment = e => {
    e.preventDefault();
    const userId = isAuthenticated().user._id;
    const token = isAuthenticated().token;
    const postId = this.props.postId;

    comment(userId, token, postId, { text: this.state.text }).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ text: '' });
        this.props.updateComments(data.comments);
      }
    });
  };

  render() {
    const { comments } = this.props;
    return (
      <div>
        <h2 className="mt-5 mb-5">Leave a Comment</h2>
        <form onSubmit={this.addComment}>
          <div className="form-group">
            <input
              type="text"
              onChange={this.handleChange}
              className="form-control"
            />
          </div>
        </form>
        {JSON.stringify(comments)}
        <hr />
        <div className="col-md-8 col-md-offset-2">
          <h3 className="text-primary">{comments.length} Comments</h3>
          <hr />
          {comments.map((comment, i) => {
            return (
              <div key={i}>
                <div>
                  <Link to={`/user/${comment.postedBy._id}`}>
                    <img
                      style={{
                        borderRadius: '50%',
                        border: '1px solid black'
                      }}
                      className="float-left mr-2"
                      width="30px"
                      height="30px"
                      src={`${process.env.REACT_APP_API_URL}/user/photo/${comment.postedBy._id}`}
                      onError={i => (i.target.src = `${DefaultProfile}`)}
                      alt={comment.postedBy.name}
                    />
                  </Link>
                  <div>
                    <p className="lead">{comment.text}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Comment;
