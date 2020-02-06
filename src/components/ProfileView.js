import React, { Component } from "react";
import { connect } from "react-redux";
import { logout, makeDecision, getToJudge, getLikedMe } from "../store";

class ProfileView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
    this.handleLike = this.handleLike.bind(this)
    this.handleDisike = this.handleDislike.bind(this)
  }

  static getDerivedStateFromProps(props, state) {
    const viewType = props.match.path;

    if (viewType === "/home") {
      if (!props.toJudge.length) {
        props.getToJudge();
      }
      return {
        user: props.toJudge[0]
      };
    }

    if (viewType === "/likedMe") {
      if (!props.likedMe.length && state.user) {
        props.getLikedMe();
      }

      return {
        user: props.likedMe[0]
      };
    }

    if (viewType === "/profile") {
      return {
        user: props.user
      };
    }

    return null;
  }

  handleLike() {
    const otherUserId = this.state.user._id
    this.props.makeDecision('like', otherUserId)
  }

  handleDislike() {
    const otherUserId = this.state.user._id
    this.props.makeDecision('dislike', otherUserId)
  }

  render() {
    const { user } = this.state;
    const { logout } = this.props;
    const viewType = this.props.match.path;
    console.log(this.state)

    if (user) {
      var { firstName, lastName, age, gender, activities, imageURLs } = user;
      activities = Object.keys(activities);

      return (
        <div className="profile-view">
          <div className="profile-name">
            <h1>
              {firstName} {lastName.slice(0, 1)}.
            </h1>
            {viewType === "/profile" && <i className="fas fa-link"></i>}
          </div>

          <img src={imageURLs[0]} alt="profile-pic" />

          <div className="profile-info">
            <h3>{age.own}</h3> |<h3>{gender.own}</h3> |<h3>Union Square</h3>
          </div>

          {activities.map((activity, index) => {
            return (
              <div className="activity" key={index}>
                <h3>{activity}</h3>
                <p>Experience Level: Medium</p>
              </div>
            );
          })}

          {/* <div className="button-container">
            <button
              className="single-btn-no"
              type="button"
              name="dontMatch"
              onClick={this.handleDecision}
            >
              No
            </button>
            <button
              className="single-btn-yes"
              type="button"
              name="match"
              onClick={this.handleDecision}
            >
              Yes
            </button>
          </div> */}

          {viewType === "/home" && (
            <div className="button-container">
              <button type="button" name="dislike" onClick={this.handleDislike}>
                <i className="fas fa-thumbs-down" name="dislike"></i>
              </button>
              <button type="button" name="like" onClick={this.handleLike}>
                <i className="fas fa-thumbs-up" name="like"></i>
              </button>
            </div>
          )}

          {viewType === "/profile" && (
            <div className="logout-buttons">
              <button type="button" onClick={logout}>
                LOGOUT
              </button>
              <button type="button">PAUSE</button>
            </div>
          )}
        </div>
      );
    } else {
      return <h1>Loading...</h1>;
    }
  }
}

const mapState = state => {
  return {
    user: state.user,
    likedMe: state.pool.usersWhoLikedMe,
    toJudge: state.pool.toJudge
  };
};

const mapDispatch = dispatch => {
  return {
    makeDecision: (decisionType, otherUserId) =>
      dispatch(makeDecision(decisionType, otherUserId)),
    getToJudge: () => dispatch(getToJudge()),
    logout: () => dispatch(logout()),
    getLikedMe: () => dispatch(getLikedMe())
  };
};

export default connect(mapState, mapDispatch)(ProfileView);
