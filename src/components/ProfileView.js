import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logout, makeDecision, getToJudge, getLikedMe } from '../store'
import { Link } from 'react-router-dom'

class ProfileView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {}
    }
    this.handleMatch = this.handleMatch.bind(this)
    this.handleDontMatch = this.handleDontMatch.bind(this)
    this.handleLike = this.handleLike.bind(this)
    this.handleDislike = this.handleDislike.bind(this)
  }

  static getDerivedStateFromProps(props, state) {
    const viewType = props.match.path

    if (viewType === '/home') {
      if (!props.toJudge.length) {
        props.getToJudge()
      }
      return {
        user: props.toJudge[0]
      }
    }

    if (viewType.split('/')[0] === '/likedMe') {
      const {index} = this.props.match.params
      if (!props.likedMe.length && state.user) {
        props.getLikedMe()
      }

      if (props.likedMe) {
        console.log(props.likedMe)
      }

      return {
        user: props.likedMe[index]
      }
    }

    if (viewType === '/profile') {
      return {
        user: props.user
      }
    }

    return null
  }

  handleMatch() {
    const otherUserId = this.state.user._id
    this.props.makeDecision('match', otherUserId)
  }

  handleDontMatch() {
    const otherUserId = this.state.user._id
    this.props.makeDecision('dontMatch', otherUserId)
  }

  handleLike() {
    const otherUserId = this.state.user._id
    this.props.makeDecision('like', otherUserId)
  }

  handleDislike() {
    const otherUserId = this.state.user._id
    this.props.makeDecision('dislike', otherUserId)
  }

  render() {
    const { user } = this.state
    const { logout } = this.props
    const viewType = this.props.match.path
    console.log(this.state)

    if (user) {
      var { firstName, lastName, age, gender, activities, imageURLs } = user
      activities = Object.keys(activities)

      return (
        <div className="profile-view">
          <div className="profile-name">
            <h1>
              {firstName} {lastName.slice(0, 1)}.
            </h1>

            {viewType === '/profile' && (
              <Link to="/profile/update">
                <i className="fas fa-user"></i>
              </Link>
            )}
          </div>

          <img src={imageURLs[0]} alt="profile-pic" />

          <div className="profile-info">
            <h3>{age.own}</h3> |<h3>{gender.own}</h3> |<h3>Union Square</h3>
          </div>

          {activities.map((activity, index) => {
            return (
              <div className="activity" key={index}>
                <h3>{activity}</h3>
                <p>Experience Level: Medium</p>
              </div>
            )
          })}

          {viewType === '/likedMe' && (
            <div className="button-container">
              <button type="button" onClick={this.handleDontMatch}>
                <i className="fas fa-thumbs-down"></i>
              </button>
              <button type="button" onClick={this.handleMatch}>
                <i className="fas fa-thumbs-up"></i>
              </button>
            </div>
          )}

          {viewType === '/home' && (
            <div className="button-container">
              <button type="button" onClick={this.handleDislike}>
                <i className="fas fa-thumbs-down"></i>
              </button>
              <button type="button" onClick={this.handleLike}>
                <i className="fas fa-thumbs-up"></i>
              </button>
            </div>
          )}

          {viewType === '/profile' && (
            <div className="logout-buttons">
              <button type="button" onClick={logout}>
                LOGOUT
              </button>
              <button type="button">PAUSE</button>
            </div>
          )}
        </div>
      )
    } else {
      return <h1>Loading...</h1>
    }
  }
}

const mapState = state => {
  return {
    user: state.user,
    likedMe: state.pool.usersWhoLikedMe,
    toJudge: state.pool.toJudge
  }
}

const mapDispatch = dispatch => {
  return {
    makeDecision: (decisionType, otherUserId) =>
      dispatch(makeDecision(decisionType, otherUserId)),
    getToJudge: () => dispatch(getToJudge()),
    logout: () => dispatch(logout()),
    getLikedMe: () => dispatch(getLikedMe())
  }
}

export default connect(mapState, mapDispatch)(ProfileView)
