import React from 'react'
import { Link } from 'react-router-dom'
import { CSSTransitions, TransitionGroup } from 'react-transition-group'

const ProfileInfo = ({ user, viewType }) => {
  var {
    firstName,
    lastName,
    age,
    gender,
    activities,
    imageURLs,
    neighborhood
  } = user
  const activityKeys = Object.keys(activities)
  console.log(neighborhood)
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
        <h3>{age.own}</h3> |<h3>{gender.own}</h3> |<h3>{neighborhood}</h3>
      </div>

      {activityKeys.map((activityName, index) => {
        return (
          <div className="activity" key={index}>
            <div className="activity-header">
              <h3>{activityName}</h3>
              <h3>{activities[activityName].experience}</h3>
            </div>
            <div>
              <p>
                Placeholder description text about activity. The quick brown fox
                jumps over the sleeping dog.
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ProfileInfo
