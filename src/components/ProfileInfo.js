import React from 'react'
import { Link } from 'react-router-dom'
import { CSSTransitions, TransitionGroup } from 'react-transition-group'

const ProfileInfo = ({ user, viewType }) => {
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
    </div>
  )
}

export default ProfileInfo
