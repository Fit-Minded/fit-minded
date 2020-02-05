import React, { Component } from 'react'
import { connect } from 'react-redux'
import { makeDecision, getMatches } from '../store'
import { Link } from 'react-router-dom'

class Matches extends Component {
  constructor(props) {
    super(props)
    this.state = {
      matches: []
    }
  }

  componentDidMount() {
    this.props.getMatches()
  }

  static getDerivedStateFromProps(props, state) {
    return {
      matches: props.matches
    }
  }

  render() {
    const { matches } = this.state
    if (matches.length > 0) {
      return (
        <div className="decision-page-container">
          {matches.map((user, index) => {
            let activities = Object.keys(user.activities)
            return (
              <Link to="/chat/">
                <div key={index} className="single-match-container">
                  <img
                    className="profile-pic-matches"
                    src={user.image}
                    alt="user-pic"
                  />
                  <div className="match-info">
                    <p>
                      {user.firstName} {user.lastName}
                    </p>

                    {activities.map((activity, index) => {
                      return <p key={index}>{activity}</p>
                    })}
                    <i class="fas fa-comment-dots"></i>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )
    } else {
      return <div>No Matches Yet</div>
    }
  }
}

const mapState = state => {
  return {
    matches: state.pool.matches
  }
}

const mapDispatch = dispatch => {
  return {
    // makeDecision: (decisionType, otherUserId) =>
    //   dispatch(makeDecision(decisionType, otherUserId)),
    getMatches: () => dispatch(getMatches())
  }
}

export default connect(mapState, mapDispatch)(Matches)
