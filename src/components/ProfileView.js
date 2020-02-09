import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { ProfileInfo, ProfileButtons } from './';
import { logout, makeDecision, getToJudge, getLikedMe } from '../store';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

class ProfileView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
    this.handleMatch = this.handleMatch.bind(this);
    this.handleDontMatch = this.handleDontMatch.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.handleDislike = this.handleDislike.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    const viewType = props.match.path;

    if (viewType === '/') {
      if (!props.toJudge.length) {
        props.getToJudge();
      }
      return {
        user: props.toJudge[0]
      };
    }

    if (viewType.split('/')[0] === '/likedMe') {
      const { index } = this.props.match.params;
      if (!props.likedMe.length && state.user) {
        props.getLikedMe();
      }

      if (props.likedMe) {
        console.log(props.likedMe);
      }

      return {
        user: props.likedMe[index]
      };
    }

    if (viewType === '/profile') {
      return {
        user: props.user
      };
    }

    return null;
  }

  handleMatch() {
    const otherUserId = this.state.user._id;
    this.props.makeDecision('match', otherUserId);
  }

  handleDontMatch() {
    const otherUserId = this.state.user._id;
    this.props.makeDecision('dontMatch', otherUserId);
  }

  handleLike() {
    const otherUserId = this.state.user._id;
    this.props.makeDecision('like', otherUserId);
  }

  handleDislike() {
    const otherUserId = this.state.user._id;
    this.props.makeDecision('dislike', otherUserId);
  }

  render() {
    const { user } = this.state;
    const { logout } = this.props;
    const viewType = this.props.match.path;
    console.log(this.state);

    return (
      <div>
        {user && (
          <TransitionGroup>
            <div className='loading-spinner'>
              <i className='fas fa-spinner'></i>
            </div>
            <CSSTransition
              key={user._id}
              appear={true}
              timeout={500}
              classNames='fade'
            >
              <ProfileInfo user={user} viewType={viewType} />
            </CSSTransition>
          </TransitionGroup>
        )}
        <ProfileButtons
          handleDislike={this.handleDislike}
          handleLike={this.handleLike}
          handleDontMatch={this.handleDontMatch}
          handleMatch={this.handleMatch}
          logout={logout}
          viewType={viewType}
        />
      </div>
    );
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
