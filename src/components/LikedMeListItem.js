import React from 'react'
import { Link } from 'react-router-dom'

const LikedMeListItem = ({ user, index }) => {
  const otherUserActivities = Object.keys(user.activities)
  return (
    <Link to={`/likedMe/${index}`}>
      <div className="list-item">
        <img src={user.imageURLs[0]} alt="user-pic" />
        <div className="list-item-info">
          <h3>
            {user.firstName} {user.lastName.slice(0, 1)}.
          </h3>
          <div>
            {otherUserActivities.map((activity, index) => {
              return (
                <img
                  src={`/ActivityIcons/${activity}.png`}
                  key={index}
                  className="list-view-icons"
                />
              )
            })}
          </div>
        </div>
        <div>
          <i className="fas fa-comment-dots"></i>
        </div>
      </div>
    </Link>
  )
}

export default LikedMeListItem
