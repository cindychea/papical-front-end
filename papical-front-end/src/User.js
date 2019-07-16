import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Tags from './Tags';

function User() {

  const [currentUser, setCurrentUser] = useState({})

// Getting current user information
  useEffect( () => {
  
    const url = 'http://localhost:8000/users/'
    axios.get(url, {headers: {Authorization: `Bearer ${localStorage.getItem('accesstoken')}`} 
    }).then(function (response) {
        setCurrentUser(response.data[0])
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        console.log(error.response.data.code);
        const refreshUrl = 'http://localhost:8000/refresh/'
        if (error.response.data.code === 'token_not_valid') {
          axios.post(refreshUrl, {refresh: localStorage.getItem('refreshtoken')})
          .then(function (response) {
            localStorage.setItem('accesstoken', response.data.access)
          })
        }
      })
      .then(function(response) {
        const url = 'http://localhost:8000/users/'
        axios.get(url, {headers: {Authorization: `Bearer ${localStorage.getItem('accesstoken')}`} 
        }).then(function (response) {
            setCurrentUser(response.data[0])
          })
      })
      .catch(function (error) {
        console.log(error);
      })
  }, [])


  // const imageUrl = `http://localhost:8000${currentUser.picture}`;

  return (
    <section>
      <h2>Profile</h2>
        <div>
          {/* <img src={`${imageUrl}`} alt={currentUser.username} /> */}
          <p>{currentUser.first_name} {currentUser.last_name}</p>
          <p>{currentUser.email}</p>
          <p>{currentUser.username}</p>
        </div>

        <div>
          <h2>Interests</h2>
          <ul>
            <Tags />
          </ul>
        </div>
    </section>
  )
}

export default User;