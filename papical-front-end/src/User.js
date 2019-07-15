import React, { useState, useEffect } from 'react';
import axios from 'axios';


function User() {

  const [currentUser, setCurrentUser] = useState({})
  // const [interests, setInterests] = useState(currentUser.tag)

// Getting current user information
  useEffect( () => {
  
    const url = 'http://localhost:8000/users/'
    axios.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accesstoken')}`
      } 
    }).then(function (response) {
        // handle success
        setCurrentUser(response.data[0])
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  
  }, [])

//   // let tags = currentUser.tag
//   // console.log(tags);

    // const ProfileInfo = (user) => {
    //   return (
    //     <div key={user.pk}>
    //       <p>{currentUser.picture}</p>
    //       <p>{currentUser.username}</p>
    //       <p>{currentUser.first_name} {currentUser.last_name}</p>
    //     </div>
    //   )
    // }
  const imageUrl = `http://localhost:8000${currentUser.picture}`;

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

          </ul>
        </div>
    </section>
  )
}

export default User;