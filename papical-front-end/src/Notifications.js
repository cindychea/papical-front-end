import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Notifications() {

  const [currentUser, setCurrentUser] = useState([])
  const [confirmedInvite, setConfirmedInvite] = useState([])
  const [pendingInvite, setPendingInvite] = useState([])
  const [userInvites, setUserInvites] = useState([])


// Getting current user's information
  useEffect( () => {
    const url = 'http://localhost:8000/users/'
    axios.get(url, {headers: {Authorization: `Bearer ${localStorage.getItem('accesstoken')}`} 
    }).then(function (response) {
        // handle success
        const user = response.data[0]
        setCurrentUser(user)
        getConfirmedInvite(user)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }, [])

  const getConfirmedInvite = (currentUser) => {
    const url = 'http://localhost:8000/invitations/'
    axios.get(url, {headers: {Authorization: `Bearer ${localStorage.getItem('accesstoken')}`} 
    }).then(function (response) {
        const inviteList = response.data
        const confirmedInvite = inviteList.filter(invite => invite.creator === currentUser.username | invite.invitee === currentUser.pk && invite.attending === "A")
        const pendingInvite = inviteList.filter(invite => invite.invitee === currentUser.pk && invite.attending === "NA")
        
        setConfirmedInvite(confirmedInvite)
        setPendingInvite(pendingInvite)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }

  const HangoutDetails = (confirmedInvite) => {
    const hangout = confirmedInvite.hangout
    
    return (
      <li key={hangout.pk}>
        <p>{hangout.name}</p>
        <p>{hangout.date}</p>
        <p>{hangout.description}</p>
        <p>{hangout.start_time}</p>
        <p>{hangout.end_time}</p>
      </li>
    )
  }

  const PendingInviteDetails = (pendingInvite) => {
    const hangout = pendingInvite.hangout
    
    return (
      <li key={hangout.pk}>
        <p>{hangout.name}</p>
        <p>{hangout.description}</p>
        <p>{hangout.start_time}</p>
        <p>{hangout.end_time}</p>
        <button>Accept</button>
        <button>Decline</button>
      </li>
    )
  }


  return (
    <section>
      <h2>Notifications</h2>

      <div>
        <h3>{confirmedInvite.length} upcoming hangouts</h3>
        <ul>
          {confirmedInvite.map((invite) => HangoutDetails(invite))}
        </ul>
      </div>
      <div>
        <h3>{pendingInvite.length} pending invitations</h3>
        <ul>
          {pendingInvite.map((invite) => PendingInviteDetails(invite))}
        </ul>
      </div>

    </section>
  )
}

export default Notifications;