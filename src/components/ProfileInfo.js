import React from 'react';
import { Link } from 'react-router-dom';
import { CSSTransitions, TransitionGroup } from 'react-transition-group';
import { Carousel } from './';

const ProfileInfo = ({ user, viewType }) => {
  var {
    firstName,
    lastName,
    age,
    gender,
    activities,
    imageURLs,
    neighborhood
  } = user;
  const activityKeys = Object.keys(activities);
  return (
    <div className='profile-view'>
      <div className='profile-name'>
        <h1>
          {firstName} {lastName.slice(0, 1)}.
        </h1>

        {viewType === '/profile' && (
          <Link to='/profile/update'>
            <i className='fas fa-user' id='user-profile-icon'></i>
          </Link>
        )}
      </div>

      <div id='carousel-div'>
        <Carousel imageURLs={imageURLs} />
      </div>

      <div className='profile-info' id='profile-view-div'>
        <h3>{age.own}</h3> |<h3>{gender.own}</h3> |<h3>{neighborhood}</h3>
      </div>

      {activityKeys.map((activityName, index) => {
        const currentActivity = activities[activityName];
        return (
          <div className='activity' key={index} id='profile-view-div'>
            <div className='activity-header'>
              <img src={currentActivity.iconPath}></img>
              <h3>{activityName}</h3>
              <h3>{currentActivity.experience}</h3>
            </div>
            <div>
              <p>{currentActivity.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProfileInfo;
