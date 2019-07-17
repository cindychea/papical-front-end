import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Cal from './Cal.js';

function FriendProfile(props) {

  const [freeTime, setFreeTime] = useState([])

  const friend = props.location.friendProfileProps.friend

  useEffect( () => {
    const url = 'https://papicalapp.herokuapp.com/freetimes/'
    axios.get(url, {headers: {Authorization: `Bearer ${localStorage.getItem('accesstoken')}`} 
    }).then(function (response) {
      const freeTimeList = response.data
      const friendFreeTime = freeTimeList.filter(freeTime => freeTime.creator === friend.username)
        setFreeTime(friendFreeTime)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        console.log(error.response.data.code);
        const refreshUrl = 'https://papicalapp.herokuapp.com/refresh/'
        if (error.response.data.code === 'token_not_valid') {
          axios.post(refreshUrl, {refresh: localStorage.getItem('refreshtoken')})
          .then(function (response) {
            localStorage.setItem('accesstoken', response.data.access)
          })
          .then(function(response) {
            const url = 'https://papicalapp.herokuapp.com/invitations/'
            axios.get(url, {headers: {Authorization: `Bearer ${localStorage.getItem('accesstoken')}`} 
          })
        })
        }
      })
    .catch(function (error) {
      console.log(error);
    })
  }, [])
  

  
  const imageUrl = (friend.picture === null) ? `https://papicalapp.herokuapp.com/media/images/profile_icon.svg` : `https://papicalapp.herokuapp.com/${friend.picture}`
  
  return (
    <div className="friend-profile">
      <h2 className="sign-up-header f-profile">{friend.first_name}'s Profile</h2>
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
          <Cal event={freeTime}/>
        </div>
    </div>
  )
}

export default FriendProfile;