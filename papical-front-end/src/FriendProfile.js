import React from 'react';
import { NavLink } from 'react-router-dom';
import Cal from './Cal.js';

function FriendProfile(props) {

  const friend = props.location.friendProfileProps.friend
  console.log(friend);

  const imageUrl = (friend.picture === null) ? `http://localhost:8000/media/images/profile_icon.svg` : `http://localhost:8000${friend.picture}`

  return (
    <div className="friend-profile">
      <h2 className="sign-up-header">{friend.first_name}'s Profile</h2>
        <div className="friend-profile-box">
          <img src={`${imageUrl}`} alt={friend.username} className="photo-holder"/>
          <div className="profile-info">
            <p><b>Name:</b> {friend.first_name} {friend.last_name}</p>
            <p><b>Email:</b> {friend.email}</p>
            <p><b>Username:</b> {friend.username}</p>
          </div>
        </div>
        <div className="top-cal">
          <h3 className="friend-avail">Availability:</h3>
          <NavLink className="std-btn base dash" to="/calendar">Book a hangout</NavLink>
        </div>
        <div id="friend-profile-cal-box">
          <Cal />
        </div>
    </div>
  )
}

export default FriendProfile;