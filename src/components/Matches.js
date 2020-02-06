import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getMatches } from '../store'
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
    const { me } = this.props
    if (matches.length > 0) {
      return (
        <div className="match-list">
          <h1>Matches</h1>
          {matches.map((user, index) => {
            // let activities = Object.keys(user.activities)
            let otherUserId = user._id
            let roomId = me.matches[otherUserId]
            console.log(roomId)
            return (
              <Link to={`/chat/${roomId}`}>
                <div key={index} className="single-match">
                  <img
                    className="match-list-picture"
                    src={user.imageURLs[0]}
                    alt="user-pic"
                  />
                  <div className="match-info">
                    <h3>
                      {user.firstName} {user.lastName.slice(0, 1)}.
                    </h3>
                    <p>Placeholder conversation text.</p>

                    {/* {activities.map((activity, index) => {
                      return <p key={index}>{activity}</p>
                    })} */}
                  </div>
                  <div>
                    <i className="fas fa-comment-dots"></i>
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
    matches: state.pool.matches,
    me: state.user
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
