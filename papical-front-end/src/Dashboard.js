import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';

function Dashboard() {
  const [currentUser, setCurrentUser] = useState([])
  const [userHangouts, setUserHangouts] = useState([])
  const [userInvites, setUserInvites] = useState([])

  const getHangouts = (currentUser) => {
    const url = 'http://localhost:8000/hangouts/'
    axios.get(url, {headers: {Authorization: `Bearer ${localStorage.getItem('accesstoken')}`} 
    }).then(function (response) {
        const hangoutList = response.data
        const filteredHangouts = hangoutList.filter(hangout => hangout['creator'] === currentUser['username'])
        // debugger;
        console.log("CurrentUser", currentUser)
        console.log("CurrentUser username", currentUser.username)
        console.log("Hangouts:", hangoutList)
        console.log("Filtered Hangouts:", filteredHangouts)
        setUserHangouts(filteredHangouts)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }

  const getInvites = (currentUser) => {
    const url = 'http://localhost:8000/invitations/'
    axios.get(url, {headers: {Authorization: `Bearer ${localStorage.getItem('accesstoken')}`} 
    }).then(function (response) {
        const inviteList = response.data
        const filteredInvites = inviteList.filter(invite => invite.invitee === currentUser.pk)
        // debugger;
        console.log("Invites:", inviteList)
        console.log("Filtered Invites:", filteredInvites)
        setUserInvites(filteredInvites)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }

  useEffect( () => {
    const url = 'http://localhost:8000/users/'
    axios.get(url, {headers: {Authorization: `Bearer ${localStorage.getItem('accesstoken')}`} 
    }).then(function (response) {
        // handle success
        console.log('data', response.data);
        const user = response.data[0]

        setCurrentUser(user)
        getHangouts(user)
        getInvites(user)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }, [])

  // useEffect( () => {
  // },[])

  return (
    <div className="dashboard">
      <h2 className="sign-up-header">Hi {currentUser.first_name}!</h2>
      <div className="activity">
        <p className="activity-header">You have</p>
        <NavLink to="/notifications">
          <p className="activity-link">{userHangouts.length} upcoming hangouts this week</p>
          <p className="activity-link">{userInvites.length} pending invitations</p>
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