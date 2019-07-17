import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cal from './Cal.js';
import BackArrow from './pictures/BackArrow.png';

function Calendar() {

  const [currentUser, setCurrentUser] = useState({})
  const [userHangouts, setUserHangouts] = useState({})

  const [hangout, setHangout] = useState({
    name: '',
    date: '',
    all_day: 'N',
    start_time: '',
    end_time: '',
    description: '',
    location: '',
    tags: ''
  })

  // all day is hardcoded in as no because of start and end times
  // in later iterations, change form so that when all day is yes, start and end time disappears
  // fix tags in later iterations as well

  const [availability, setAvailability] = useState({
    date: '',
    start_time: '',
    end_time: '',
    available: true,
  })

  const [state, setState] = useState({
    active: 'calView',
  });

  const submitHangout = (e) => {
    e.preventDefault()
    bookHangoutSubmit(hangout)
  }

  const submitAvailability = (e) => {
    e.preventDefault()
    availabilitySubmit(availability)
  }

  const bookHangoutSubmit = ({name, date, start_time, end_time, description, location}) => {
    console.log('booking')
    const url = 'http://localhost:8000/hangouts/'
    axios.post(url, {
      name,
      date,
      start_time,
      end_time,
      description,
      location,
      tags: ''
      })
    .then(function(response) {
      console.log(response)
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
      const url = 'http://localhost:8000/hangouts/'
      axios.post(url, {
        name,
        date,
        start_time,
        end_time,
        description,
        location,
        tags: ''
        })
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  const availabilitySubmit = ({date, start_time, end_time, available}) => {
    console.log('availabile book')
    const url = 'http://localhost:8000/freetimes/'
    axios.post(url, {
      date,
      start_time,
      end_time,
      available
      })
    .then(function(response) {
      console.log(response)
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
      const url = 'http://localhost:8000/freetimes/'
      axios.post(url, {
        date,
        start_time,
        end_time,
        available
        })
    })
    .catch(function (error) {
      console.log(error);
    })
  }


  // Getting current user information
    useEffect( () => {
    
      const url = 'http://localhost:8000/users/'
      axios.get(url, {headers: {Authorization: `Bearer ${localStorage.getItem('accesstoken')}`} 
      }).then(function (response) {
          const user = response.data[0]
          setCurrentUser(user)
          getUserHangouts(user)
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
              const user = response.data[0]
              setCurrentUser(user)
              getUserHangouts(user)
            })
        })
        .catch(function (error) {
          console.log(error);
        })
    }, [])

  // Getting current user's hangouts
  const getUserHangouts = (currentUser) => {
    console.log('getting hangouts')
    const url = 'http://localhost:8000/invitations/'
    axios.get(url, {headers: {Authorization: `Bearer ${localStorage.getItem('accesstoken')}`} 
    }).then(function (response) {
        const inviteList = response.data
        const acceptedInvite = inviteList.filter(invite => invite.creator === currentUser.username | invite.invitee['pk'] === currentUser.pk && invite.attending === "A")
        const inviteHangouts = acceptedInvite.map(invite => invite.hangout)
        setUserHangouts(inviteHangouts)
    
      })
      .catch(function (error) {
        console.log(error.response.data.code);
        const refreshUrl = 'http://localhost:8000/refresh/'
        if (error.response.data.code === 'token_not_valid') {
          axios.post(refreshUrl, {refresh: localStorage.getItem('refreshtoken')})
          .then(function (response) {
            localStorage.setItem('accesstoken', response.data.access)
            const inviteList = response.data
            const acceptedInvite = inviteList.filter(invite => invite.creator === currentUser.username | invite.invitee['pk'] === currentUser.pk && invite.attending === "A")
            const inviteHangouts = acceptedInvite.map(invite => invite.hangout)
            setUserHangouts(inviteHangouts)
          })
          .catch(function (error) {
            console.log(error);
          })
        }
      })
      
    }


  function calView() {
    return (
      <React.Fragment>
        <div className="calendar">
          <h2 className="sign-up-header cal">Calendar</h2>
          <div className="sign-up-btns">
            <button className="std-btn base cal" onClick={() => {setState({...state, active: 'bookHangout'})}}>Book a Hangout</button>
            <button className="hollow-btn base cal" onClick={() => {setState({...state, active: 'addAvailability'})}}>Add Availability</button>
          </div>
          <div id="calendar-box">
            <Cal userHangouts={userHangouts} />
          </div>
        </div>
      </React.Fragment>
    )
  }

  function bookHangout() {
    return (
      <React.Fragment>
        <div className="sign-up-one-box">
          <div className="back-button-box">
            <button className="back-button" type='button' onClick={() => {setState({...state, active: 'calView'})}}>
              <img src={BackArrow} alt="Back to Previous Page"></img>
            </button>
          </div>
          <form onSubmit={submitHangout} id="book-hangout-form">
          <h2 className="sign-up-header">Book a Hangout</h2>
            <input className="sign-up-input" type='text' name='EventName' placeholder='Event Name' onChange={(e) => setHangout({...hangout, name: e.target.value})}/>
            <label className="cal-input-time" for='Date'>Date</label>
            <input className="sign-up-input time" type='date' name='Date' id='Date' onChange={(e) => setHangout({...hangout, date: e.target.value})}/>
            <label className="cal-input-time" for='StartTime'>Start Time</label>
            <input className="sign-up-input time" type='time' name='StartTime' id='StartTime' onChange={(e) => setHangout({...hangout, start_time: e.target.value})}/>
            <label className="cal-input-time" for='EndTime'>End Time</label>            
            <input className="sign-up-input time" type='time' name='EndTime' id='EndTime' onChange={(e) => setHangout({...hangout, end_time: e.target.value})}/>
            <input className="sign-up-input" type='text' name='Description' placeholder='Description' onChange={(e) => setHangout({...hangout, description: e.target.value})}/>
            <input className="sign-up-input" type='location' name='Location' placeholder='Location' onChange={(e) => setHangout({...hangout, location: e.target.value})}/>
            <input className="sign-up-input" type='text' name='tag' placeholder='Tags' />            
            <button type="submit" form="book-hangout-form" className="std-btn base" onClick={() => {setState({...state, active: 'calView'})}}>Submit</button>
          </form>
        </div>
      </React.Fragment>
    )
  }

  function addAvailability() {
    return (
      <React.Fragment>
        <div className="sign-up-one-box">
          <div className="back-button-box">
            <button className="back-button" type='button' onClick={() => {setState({...state, active: 'calView'})}}>
              <img src={BackArrow} alt="Back to Previous Page"></img>
            </button>
          </div>
          <form onSubmit={submitAvailability} id="add-availability-form">
          <h2 className="sign-up-header">Add Availability</h2>
          <label className="cal-input-time" for='Date'>Date</label>
            <input className="sign-up-input" type='date' name='Date' id='Date' onChange={(e) => setAvailability({...availability, date: e.target.value})}/>
            <label className="cal-input-time" for='StartTime'>Start Time</label>
            <input className="sign-up-input" type='time' name='StartTime' id='StartTime' onChange={(e) => setAvailability({...availability, start_time: e.target.value})}/>
            <label className="cal-input-time" for='EndTime'>End Time</label>            
            <input className="sign-up-input" type='time' name='EndTime' id='EndTime' onChange={(e) => setAvailability({...availability, end_time: e.target.value})}/>
            <button type="submit" form="add-availability-form" className="std-btn base" onClick={() => {setState({...state, active: 'calView'})}}>Submit</button>
          </form>
        </div>
      </React.Fragment>
    )
  }

  function getActiveStep() {
    switch (state.active) {
      case 'calView':
        return calView();
      case 'bookHangout':
        return bookHangout();
      case 'addAvailability':
        return addAvailability();
      default:
        return calView();
    }
  }

  return (
    <React.Fragment>
      {getActiveStep()}
    </React.Fragment>
  )
}

export default Calendar;