import React from 'react'
import { Link } from 'react-router-dom'

const MatchListItem = ({ user, me }) => {
  const otherUserId = user._id
  const roomId = me.matches[otherUserId]
  return (
    <Link to={`/chat/${roomId}`}>
      <div className="list-item">
        <img src={user.imageURLs[0]} alt="user-pic" />
        <div className="list-item-info">
          <h3>
            {user.firstName} {user.lastName.slice(0, 1)}.
          </h3>
          <p>Placeholder conversation text.</p>
        </div>
        <div>
          <i className="fas fa-comment-dots"></i>
        </div>
      </div>
    </Link>
  )
}

export default MatchListItem