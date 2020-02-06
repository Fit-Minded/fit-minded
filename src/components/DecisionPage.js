import React, { Component } from 'react'
import { connect } from 'react-redux'
import { makeDecision, getToJudge } from '../store'

class DecisionPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      toJudge: []
    }
    this.handleLike = this.handleLike.bind(this)
    this.handleDisike = this.handleDislike.bind(this)
  }

  static getDerivedStateFromProps(props, state) {
    if (props.pool.toJudge.length === 0) {
      props.getToJudge()
    }
    return {
      toJudge: props.pool.toJudge
    }
  }

  handleLike() {
    const otherUserId = this.state.toJudge[0]._id
    this.props.makeDecision('like', otherUserId)
  }

  handleDislike() {
    const otherUserId = this.state.toJudge[0]._id
    this.props.makeDecision('dislike', otherUserId)
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
          <div className="profile-info">
            <h3>Age: {age.own}</h3>
            <h3>Gender: {gender.own}</h3>
          </div>
          {activities.map((activity, index) => {
            return (
              <div className="activity-cont" key={index}>
                {activity}
              </div>
            )
          })}

          <div className="button-container">
            <button type="button" name="dislike" onClick={this.handleDislike}>
              <i className="fas fa-thumbs-down" name="dislike"></i>
            </button>
            <button type="button" name="like" onClick={this.handleLike}>
              <i className="fas fa-thumbs-up" name="like"></i>
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
