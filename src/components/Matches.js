import React, { Component } from 'react';
import { connect } from 'react-redux';
import { makeDecision, getMatches } from '../store';

class Matches extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: []
    };
    // this.handleDecision = this.handleDecision.bind(this);
  }

  componentDidMount() {
    this.props.getMatches();
  }

  static getDerivedStateFromProps(props, state) {
    return {
      matches: props.matches
    };
  }

  // handleDecision(e) {
  //   const decisionType = e.target.name;
  //   const otherUserId = this.state.usersWhoLikedMe[0]._id;
  //   this.props.makeDecision(decisionType, otherUserId);
  // }

  render() {
    const { matches } = this.state;
    if (matches.length > 0) {
      return (
        <div className='decision-page-container'>
          {matches.map((user, index) => {
            let activities = Object.keys(user.activities);
            return (
              <div key={index} className='single-match-container'>
                <img
                  className='profile-pic-toJudge'
                  src={user.image}
                  alt='user-pic'
                />
                <div className='match-info'>
                  <h1>
                    {user.firstName} {user.lastName}
                  </h1>
                  <h1>
                    {user.gender.own}, {user.age.own}
                  </h1>
                  {activities.map((activity, index) => {
                    return <h2 key={index}>{activity}</h2>;
                  })}
                </div>
                <button type='button'>Let's Chat</button>
              </div>
            );
          })}
        </div>
      );
    } else {
      return <div>No Matches Yet</div>;
    }
  }
}

const mapState = state => {
  return {
    matches: state.pool.matches
  };
};

const mapDispatch = dispatch => {
  return {
    // makeDecision: (decisionType, otherUserId) =>
    //   dispatch(makeDecision(decisionType, otherUserId)),
    getMatches: () => dispatch(getMatches())
  };
};

export default connect(mapState, mapDispatch)(Matches);
