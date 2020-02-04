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
    if (toJudge.length > 0 && toJudge[0] !== null) {
      console.log(toJudge)
      let { firstName, lastName, age, gender, activities, image } = toJudge[0]
      activities = Object.keys(activities)
      return (
        <div className="decision-page">
          <div className="name-toJudge">
            <h1>
              {firstName} {lastName.slice(0, 1)}.
            </h1>
          </div>
          <div className="profile-pic-toJudge-container">
            <img
              src={image}
              alt="profile-pic"
              className="profile-pic-toJudge"
            />
          </div>
          {activities.map((activity, index) => {
            return (
              <div className="activity-cont" key={index}>
                {activity}
              </div>
            )
          })}
          <div className="button-container">
            <button
              // className="single-btn-no"
              type="button"
              name="dislike"
              onClick={this.handleDecision}
            >
              <i className="fas fa-thumbs-down"></i>
            </button>
            <button
              // className="single-btn-yes"
              type="button"
              name="like"
              onClick={this.handleDecision}
            >
              <i className="fas fa-thumbs-up"></i>
            </button>
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
