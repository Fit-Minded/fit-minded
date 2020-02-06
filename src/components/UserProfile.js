import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logout } from '../store'

class UserProfile extends Component {
  render() {
    const { logout } = this.props
    let {
      image,
      firstName,
      lastName,
      activities,
      age,
      gender
    } = this.props.user
    console.log(this.props.user)
    activities = Object.keys(activities)
    return (
      <div id="userProfile">
        <h1>
          {firstName} {lastName}
        </h1>
        <img src={image} alt="userPic" />
        {activities.map((activity, index) => {
          return (
            <div className="activity-cont" key={index}>
              {activity}
            </div>
          )
        })}
        <div>Age: {age.own}</div>
        <div>Gender: {gender.own}</div>

        <button className="logout-btn" type="button" onClick={logout}>
          LOGOUT
        </button>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(mapState, mapDispatch)(UserProfile)
