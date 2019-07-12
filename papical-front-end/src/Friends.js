import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { userInfo } from 'os';

function Friends() {

  const [friends, setFriends] = useState([])

  useEffect( () => {

    const url = 'http://localhost:8000/friends/'
    axios.get(url, {headers: {Authorization: `Bearer ${localStorage.getItem('accesstoken')}`} 
    }).then(function (response) {
        // handle success
        console.log('data', response.data);
        setFriends(response.data)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })

  }, [])

  const FriendsList = (friend) => {
    return (
        <li key={friend.pk}>
          <p>{friend.from_user.picture}</p>
          <p>{friend.from_user.username}</p>
          <p>{friend.from_user.first_name} {friend.from_user.last_name}</p>
          <p>{friend.from_user.email}</p>
          <p>{friend.from_user.date_of_birth}</p>
          <p>{friend.from_user.location}</p>
          <p>{friend.from_user.tag}</p>
        </li>
    )
  }

  return (
    <section>
      <h2>Friends</h2>
        <ul>
          {friends.map((friend) => FriendsList(friend))}
        </ul>
      <p></p>
    </section>
  )
}

export default Friends;