import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getLikedMe, makeDecision } from '../store'

class LikedMe extends Component {
  constructor(props) {
    super(props)
    this.state = {
      usersWhoLikedMe: []
    }
    this.handleDecision = this.handleDecision.bind(this)
  }

  componentDidMount() {
    this.props.getLikedMe()
  }

  static getDerivedStateFromProps(props, state) {
    return {
      usersWhoLikedMe: props.usersWhoLikedMe
    }
  }

  handleDecision(e) {
    const decisionType = e.target.name
    const otherUserId = this.state.usersWhoLikedMe[0]._id
    this.props.makeDecision(decisionType, otherUserId)
  }

  render() {
    const { usersWhoLikedMe } = this.state
    console.log("state",this.state)

    if (usersWhoLikedMe.length > 0) {
      let {
        firstName,
        lastName,
        age,
        gender,
        activities,
        image
      } = usersWhoLikedMe[0]

      activities = Object.keys(activities)
      return (
        <div className="decision-page-container">
          <div className="decision-page">
            <div className="profile-pic-toJudge-container">
              <img
                src={image}
                alt="profile-pic"
                className="profile-pic-toJudge"
              />
            </div>
            <div className="name-toJudge">
              <h1>
                {firstName} {lastName}
              </h1>
              <h2>
                {gender.own}, {age.own}
              </h2>
            </div>
            <div className="activity-list-container">
              <ul>
                <h2 className="workouts-h2">My Workouts</h2>
                <div className="activity-list-subcontainer">
                  {activities.map((activity, index) => {
                    return (
                      <h2 className="activities-list" key={index}>
                        {activity}
                      </h2>
                    )
                  })}
                </div>
              </ul>
            </div>
            <div className="button-container">
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
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="no-likes">New Likes will show here, eventually</div>
      )
    }
  }
}

const mapState = state => {
  return {
    usersWhoLikedMe: state.pool.usersWhoLikedMe
  }
}

const mapDispatch = dispatch => {
  return {
    makeDecision: (decisionType, otherUserId) =>
      dispatch(makeDecision(decisionType, otherUserId)),
    getLikedMe: () => dispatch(getLikedMe())
  }
}

export default connect(mapState, mapDispatch)(LikedMe)
