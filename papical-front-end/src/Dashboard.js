import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

function Dashboard() {
  const [currentUser, setCurrentUser] = useState([])
  const [confirmedInvite, setConfirmedInvite] = useState([])
  const [pendingInvite, setPendingInvite] = useState([])

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
        const confirmedInvite = inviteList.filter(invite => invite.creator === currentUser.username | invite.invitee['pk'] === currentUser.pk && invite.attending === "A")
        const pendingInvite = inviteList.filter(invite => invite.invitee['pk'] === currentUser.pk && invite.attending === "NA")
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
    <div className="dashboard">
      <h2 className="sign-up-header">Hi {currentUser.first_name}!</h2>
      <div className="activity">
        <p className="activity-header">You have</p>
        <NavLink to="/notifications">
          <p className="activity-link">{confirmedInvite.length} upcoming hangouts this week</p>
          <p className="activity-link">{pendingInvite.length} pending invitations</p>
        </NavLink>
      </div>
      <div className="activity">
        <p className="activity-header two">Your weekly summary:</p>
        {/* make this into a link */}
        <button className="std-btn base dash">Book a hangout</button>
        {/* add calendar */}
      </div>
    </div>
  )
}

export default Dashboard;