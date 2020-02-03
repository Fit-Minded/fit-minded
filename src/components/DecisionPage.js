import React, { Component } from 'react'
import { connect } from 'react-redux'
import { makeDecision, getToJudge } from '../store'

class DecisionPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      toJudge: []
    }
    this.handleDecision = this.handleDecision.bind(this)
  }

  static getDerivedStateFromProps(props, state) {
    if (props.pool.toJudge.length === 0) {
      props.getToJudge()
    }
    return {
      toJudge: props.pool.toJudge
    }
  }

  handleDecision(e) {
    const decisionType = e.target.name
    const otherUserId = this.state.toJudge[0]._id
    this.props.makeDecision(decisionType, otherUserId)
  }

  render() {
    const { toJudge } = this.state
    if (toJudge.length > 0) {
      let { firstName, lastName, age, gender, activities, image } = toJudge[0]
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
                name="dislike"
                onClick={this.handleDecision}
              >
                X
              </button>
              <button
                className="single-btn-yes"
                type="button"
                name="like"
                onClick={this.handleDecision}
              >
                √
              </button>
            </div>
          </div>
        </div>
      )
    } else {
      return <div>loading...</div>
    }
  }
}

const mapState = state => {
  return {
    pool: state.pool
  }
}

const mapDispatch = dispatch => {
  return {
    makeDecision: (decisionType, otherUserId) =>
      dispatch(makeDecision(decisionType, otherUserId)),
    getToJudge: () => dispatch(getToJudge())
  }
}

export default connect(mapState, mapDispatch)(DecisionPage)
