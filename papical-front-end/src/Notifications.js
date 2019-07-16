import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Notifications() {

  const [currentUser, setCurrentUser] = useState([])
  const [confirmedInvite, setConfirmedInvite] = useState([])
  const [pendingInvite, setPendingInvite] = useState([])
  // const [userHangouts, setUserHangouts] = useState([]) NOTE: USE FOR FUTURE WHEN ADD INVITES SENT BY USER

// Getting current user's information
  useEffect( () => {
    const url = 'http://localhost:8000/users/'
    axios.get(url, {headers: {Authorization: `Bearer ${localStorage.getItem('accesstoken')}`} 
    }).then(function (response) {
        // handle success
        const user = response.data[0]
        setCurrentUser(user)
        getInvites(user)
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
        })
      })
      .catch(function (error) {
        console.log(error);
      })
  }, [])

  const getInvites = (currentUser) => {
    const url = 'http://localhost:8000/invitations/'
    axios.get(url, {headers: {Authorization: `Bearer ${localStorage.getItem('accesstoken')}`} 
    }).then(function (response) {
      const inviteList = response.data
        const confirmedInvite = inviteList.filter(invite => invite.creator === currentUser.username | invite.invitee['pk'] === currentUser.pk && invite.attending === "A")
        const pendingInvite = inviteList.filter(invite => invite.invitee['pk'] === currentUser.pk && invite.attending === "NA")
        setConfirmedInvite(confirmedInvite)
        setPendingInvite(pendingInvite)
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
        const url = 'http://localhost:8000/invitations/'
        axios.get(url, {headers: {Authorization: `Bearer ${localStorage.getItem('accesstoken')}`} 
        })
      })
      .catch(function (error) {
        console.log(error);
      })
    }
    
  const HangoutDetails = (confirmedInvite) => {
    const hangout = confirmedInvite.hangout
    const invitee = confirmedInvite.invitee['username']
    const creator = confirmedInvite.creator

    const friend = (invitee !== currentUser.username) ? invitee : creator

    return (
      <li key={hangout.pk}>
        <p>{hangout.name}</p>
        <p>{hangout.date}</p>
        <p>{hangout.description}</p>
        <p>{hangout.start_time}</p>
        <p>{hangout.end_time}</p>
        <p>{friend}</p>
      </li>
    )
  }

  const PendingInviteDetails = (pendingInvite) => {
    const hangout = pendingInvite.hangout
    const invitee = pendingInvite.invitee['username']
    const creator = pendingInvite.creator

    const friend = (invitee !== currentUser.username) ? invitee : creator

    return (
      <li key={hangout.pk}>
        <p>{hangout.name}</p>
        <p>{hangout.description}</p>
        <p>{hangout.start_time}</p>
        <p>{hangout.end_time}</p>
        <p>{friend}</p>
        <a href="#">Accept</a>
        <a href="#">Decline</a>
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



// USE FOR FUTURE WHEN GETTING HANGOUTS SENT BY USER
  // const getHangouts = (currentUser) => {
  //   const url = 'http://localhost:8000/hangouts/'
  //   axios.get(url, {headers: {Authorization: `Bearer ${localStorage.getItem('accesstoken')}`} 
  //   }).then(function (response) {
  //       const hangoutList = response.data
  //       const filteredHangouts = hangoutList.filter(hangout => hangout['creator'] === currentUser['username'])
  //       // debugger;
  //       console.log("CurrentUser", currentUser)
  //       console.log("CurrentUser username", currentUser.username)
  //       console.log("Hangouts:", hangoutList)
  //       console.log("Filtered Hangouts:", filteredHangouts)
  //       setUserHangouts(filteredHangouts)
  //     })
  //     .catch(function (error) {
  //       // handle error
  //       console.log(error);
  //     })
  // }