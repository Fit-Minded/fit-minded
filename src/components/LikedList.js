import React, { Component } from "react";
import { connect } from "react-redux";
import { getLikedMe } from "../store";
import { Link } from "react-router-dom";

class LikedList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      likes: []
    };
  }

  componentDidMount() {
    this.props.getLikedMe();
  }

  static getDerivedStateFromProps(props, state) {
    return {
      likes: props.likes
    };
  }

  render() {
    console.log("this.state", this.state);
    const { likes } = this.state;

    if (likes.length > 0) {
      return (
        <div>
          {likes.map(like => {
            let activities = Object.keys(like.activities);
            return (
              <Link to={`/LikedMe`}>
                <img
                  className="profile-pic-matches"
                  src={like.image}
                  alt="user-pic"
                />

                <p>
                  {like.firstName} {like.lastName}
                </p>

                {activities.map((activity, index) => {
                  return <p key={index}>{activity}</p>;
                })}
              </Link>
            );
          })}
        </div>
      );
    } else {
      return <div>You do not go here</div>;
    }
  }
}

const mapState = state => {
  return {
    likes: state.pool.usersWhoLikedMe
  };
};

const mapDispatch = dispatch => {
  return {
    getLikedMe: () => dispatch(getLikedMe())
  };
};

export default connect(mapState, mapDispatch)(LikedList);
