import React from 'react'
import { Link } from 'react-router-dom'

const LikedMeListItem = ({ user, index }) => {
  return (
    <Link to={`/likedMe/${index}`}>
      <div className="single-match">
        <img
          className="match-list-picture"
          src={user.imageURLs[0]}
          alt="user-pic"
        />
        <div className="match-info">
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

export default LikedMeListItem
