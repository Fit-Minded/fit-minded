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
    const { likes } = this.state;
    const { me } = this.props;

    if (likes.length > 0) {
      return (
        <div className="match-list">
          <h1>Likes</h1>
          {likes.map((like, index) => {
            // let activities = Object.keys(like.activities);
            return (
              <Link to={`/likedMe/${like._id}`}>
                <div key={index} className="single-match">
                  <img
                    className="match-list-picture"
                    src={like.imageURLs[0]}
                    alt="user-pic"
                  />
                  <div className="match-info">
                    <p>
                      {like.firstName} {like.lastName.slice(0, 1)}
                    </p>

                    {/* {activities.map((activity, index) => {
                      return <p key={index}>{activity}</p>;
                    })} */}
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      );
    } else {
      return <div>No lovin yet!</div>;
    }
  }
}

const mapState = state => {
  return {
    likes: state.pool.usersWhoLikedMe,
    me: state.user
  };
};

const mapDispatch = dispatch => {
  return {
    getLikedMe: () => dispatch(getLikedMe())
  };
};

export default connect(mapState, mapDispatch)(LikedList);
