import React, { Component } from 'react'
import { connect } from 'react-redux'
import { logout } from '../store'

class UserProfile extends Component {
  render() {
    const { logout } = this.props
    let {
      imageURLs,
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
        <img src={imageURLs[0]} alt="userPic" />
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
