import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import { request } from 'https';
// import { userInfo } from 'os';

function Friends() {
  
  const [friends, setFriends] = useState([])
  const [currentUser, setCurrentUser] = useState([])
  
  // getting current information
  useEffect( () => {
  
    const url = 'http://localhost:8000/users/'
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
        console.log(error);
      })
  
  }, [])

  // getting unique list of friendships
  useEffect( () => {

      const url = 'http://localhost:8000/friends/'
      axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accesstoken')}`
        } 
      }).then(function (response) {
          // handle success
          // console.log('data', response.data);
          setFriends(response.data)
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })

    }, [])

  //getting friends list
  let friendUsers = []
  const FriendsList = (friend) => {
    const user = currentUser[0];
    const from_user = friend.from_user
    const to_user = friend.to_user

    if (to_user.pk !== user.pk) {
      friendUsers.push(to_user)
    }
    if (from_user.pk !== user.pk) {
      friendUsers.push(from_user)
    }

    //getting unique friends
    var listOfFriends = friendUsers.reduce((unique, o) => {
      if(!unique.some(obj => obj.pk === o.pk)) {
        unique.push(o);
      }
      return unique;
    },[])

    console.log(listOfFriends)

    // listOfFriends.forEach((user) => {
    //   console.log(user);

    // })


    // return (
    //     <li key={friend.pk}>
    //       <p>{to_user.picture}</p>
    //       <p>{to_user.username}</p>
    //       <p>{to_user.first_name} {to_user.last_name}</p>
    //     </li>
    //   )
    

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