import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tags from './Tags';

function User() {

  const [currentUser, setCurrentUser] = useState({})

// Getting current user information
  useEffect( () => {
  
    const url = 'http://localhost:8000/users/current/'
    axios.get(url, {headers: {Authorization: `Bearer ${localStorage.getItem('accesstoken')}`} 
    }).then(function (response) {
        setCurrentUser(response.data)
      })
      .catch(function (error) {
        // handle error
        // console.log(error);
        // console.log(error.response.data.code);
        const refreshUrl = 'http://localhost:8000/refresh/'
        if (error.response.data.code === 'token_not_valid') {
          axios.post(refreshUrl, {refresh: localStorage.getItem('refreshtoken')})
          .then(function (response) {
            localStorage.setItem('accesstoken', response.data.access)
          })
        }
      })
      .then(function(response) {
        const url = 'http://localhost:8000/users/current/'
        axios.get(url, {headers: {Authorization: `Bearer ${localStorage.getItem('accesstoken')}`} 
        }).then(function (response) {
            setCurrentUser(response.data)
          })
      })
      .catch(function (error) {
        console.log(error);
      })
  }, [])

  // const imageUrl = (currentUser.picture === null) ? `http://localhost:8000/media/images/profile_icon.svg` : 'http://localhost:8000/media/images/jane-the-virgin.png'
  const imageUrl = (currentUser.picture === null) ? `http://localhost:8000/media/images/profile_icon.svg` : `http://localhost:8000/${currentUser.picture}`


  return (
    <div className="profile-box">
      <h2 className="sign-up-header profile">Profile</h2>
      <div className="inner-profile">
        <img src={`${imageUrl}`} alt={currentUser.username} className="photo-holder-profile"/>
        <div className="basic-info">
          <p className="user-info"><b>Full Name:</b> {currentUser.first_name} {currentUser.last_name}</p>
          <p className="user-info"><b>Email:</b> {currentUser.email}</p>
          <p className="user-info border"><b>Username:</b> {currentUser.username}</p>
          <div className="interest-info">
            <h2 className="interest-header"><b>Interests:</b></h2>
            <ul>
              <Tags />
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default User;