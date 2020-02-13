import React from 'react'
import { Link } from 'react-router-dom'

const MatchListItem = ({ user, me }) => {
  const otherUserId = user._id
  const otherUserActivities = Object.keys(user.activities)
  if (me.matches[otherUserId]) {
    const roomId = me.matches[otherUserId].roomId
    const matchObject = me.matches[otherUserId]
    const { location, activities } = matchObject
    return (
      <Link
        to={{
          pathname: `/chat/${roomId}`,
          state: {
            activities,
            longitude: location[0],
            latitude: location[1],
            user
          }
        }}
      >
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
  } else {
    return <div></div>
  }
}

export default MatchListItem
