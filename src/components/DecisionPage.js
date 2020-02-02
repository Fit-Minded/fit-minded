import React, { Component } from 'react'
import { connect } from 'react-redux'
import { makeDecision } from '../store'

class DecisionPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      toJudge: []
    }
    this.handleDecision = this.handleDecision.bind(this)
  }

  static getDerivedStateFromProps(props, state) {
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
    console.log(toJudge)
    if (toJudge.length) {
      let { firstName, lastName, age, gender, activities } = toJudge[0]
      activities = Object.keys(activities)
      return (
        <div>
          <h1>
            {firstName} {lastName}
          </h1>
          <h2>Age: {age.own}</h2>
          <h2>Gender: {gender.own}</h2>
          <ul>
            <h2>Activities:</h2>
            {activities.map((activity, index) => {
              return <li key={index}>{activity}</li>
            })}
          </ul>
          <button type="button" name="like" onClick={this.handleDecision}>
            Like
          </button>
          <button type="button" name="dislike" onClick={this.handleDecision}>
            Dislike
          </button>
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
      dispatch(makeDecision(decisionType, otherUserId))
  }
}

export default connect(mapState, mapDispatch)(DecisionPage)
