import React from 'react';

const ProfileButtons = ({
  handleDislike,
  handleLike,
  handleMatch,
  handleDontMatch,
  logout,
  viewType
}) => {
  return (
    <div>
      {viewType === '/' && (
        <div className='button-container'>
          <button type='button' onClick={handleDislike}>
            <i className='fas fa-thumbs-down'></i>
          </button>
          <button type='button' onClick={handleLike}>
            <i className='fas fa-thumbs-up'></i>
          </button>
        </div>
      )}

      {viewType === '/likedMe/:index' && (
        <div className='button-container'>
          <button type='button' onClick={handleDontMatch}>
            <i className='fas fa-thumbs-down'></i>
          </button>
          <button type='button' onClick={handleMatch}>
            <i className='fas fa-thumbs-up'></i>
          </button>
        </div>
      )}

      {viewType === '/profile' && (
        <div className='logout-buttons'>
          <button id='logout-btn' type='button' onClick={logout}>
            LOGOUT
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileButtons;
