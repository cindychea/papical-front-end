import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
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
      <div className="notif-container">
        <div className="notif-box" key={hangout.pk}>
          <div className="notif-left">
            <p className="notif-name">{hangout.name}</p>
            <p className="notif-friend">{friend}</p>
          </div>
          <div className="notif-right">
            <p className="notif-dt">{hangout.date}</p>
            <p className="notif-dt">{hangout.start_time.substr(0, hangout.start_time.length - 3)} to {hangout.end_time.substr(0, hangout.end_time.length - 3)}</p>
          </div>
        </div>
        <p>{hangout.description}</p>
      </div>
    )
  }

  const PendingInviteDetails = (pendingInvite) => {
    const hangout = pendingInvite.hangout
    const invitee = pendingInvite.invitee['username']
    const creator = pendingInvite.creator    
    const friend = (invitee !== currentUser.username) ? invitee : creator

    return (
      <li className="notif-box" key={hangout.pk}>
        <div className="notif-left">
        <p className="notif-name">{hangout.name}</p>
        <p className="notif-friend">{friend}</p>
        <p className="notif-dt">{hangout.date}</p>
        <p className="notif-dt">{hangout.start_time.substr(0, hangout.start_time.length - 3)} to {hangout.end_time.substr(0, hangout.end_time.length - 3)}</p>
        </div>
        <div className="notif-right">
        <NavLink className="hollow-btn small" to="/notifications">Accept</NavLink>
        <NavLink className="hollow-btn small" to="/notifications">Decline</NavLink>
        </div>
      </li>
    )
  }

  return (
    <div className="notification-box">
      <h2 className="sign-up-header">Notifications</h2>
      <div className="notifications">
        <div className="upcoming-hangouts">
          <h3 className="upcoming-header">{confirmedInvite.length} upcoming hangouts</h3>
            {confirmedInvite.map((invite) => HangoutDetails(invite))}
        </div>
        <div className="upcoming-invites">
          <h3 className="upcoming-header">{pendingInvite.length} pending invitations</h3>
            {pendingInvite.map((invite) => PendingInviteDetails(invite))}
        </div>
      </div>
    </div>
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