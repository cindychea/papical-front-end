import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchFriends from './SearchFriends.js';

function Friends() {

  const [friendships, setFriendships] = useState([]);
  const [currentUser, setCurrentUser] = useState({});

// Getting current user information
  useEffect( () => {
  
    const url = 'http://localhost:8000/users/current/'
    axios.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accesstoken')}`
      } 
    }).then(function (response) {
        // handle success
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
          .then(function(response) {
            const url = 'http://localhost:8000/users/current/'
            axios.get(url, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('accesstoken')}`
              } 
            })
          })
        }
      })
      .catch(function (error) {
        console.log(error);
      })
  }, [])
  
  // Getting list of friendships
  useEffect( () => {

    const url = 'http://localhost:8000/friends/'
    axios.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accesstoken')}`
      } 
    }).then(function (response) {
        // handle success
        setFriendships(response.data)
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
          .then(function(response) {
            const url = 'http://localhost:8000/friends/'
            axios.get(url, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('accesstoken')}`
              } 
            }).then(function (response) {
              setFriendships(response.data)
            })
          })
        }
      })
      .catch(function (error) {
        console.log(error);
      })
  }, [])

  const FriendDetails = (friendship) => {
    const from_user = friendship.from_user
    const to_user = friendship.to_user

    // let friend = null
    // if (friendship.to_user === currentUser) {
    //   friend = from_user
    // } else {
    //   friend = to_user
    // }

    const friend = (friendship.to_user.pk === currentUser.pk) ? from_user : to_user
    
    const imageUrl = (friend.picture === null) ? `http://localhost:8000/media/images/profile_icon.svg` : `http://localhost:8000/${friend.picture}`

    return (
      <Link id="notif-friend" to={{
        pathname: "/friendprofile",
        friendProfileProps:{
          friend: friend
        }
      }} key={friend.pk} className="friend">
      <img src={`${imageUrl}`} alt={friend.username} className="friends-photo"/>
      <p className="friend-name">{friend.first_name} {friend.last_name}</p>
      </Link>
    )
  }

  return (
    <section className="friends-box">
      <div className="inner-content">      
        <h2 className="sign-up-header">Friends</h2>        
        <SearchFriends />
        {friendships.map((friendship) => FriendDetails(friendship))}
      </div>
    </section>
  )
}

export default Friends;