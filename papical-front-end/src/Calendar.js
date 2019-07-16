import React, { useState } from 'react';
import Cal from './Cal.js';

function Calendar() {

  const [state, setState] = useState({
    active: 'calView',
  });

  function calView() {
    return (
      <React.Fragment>
        <div className="calendar">
          <h2 className="sign-up-header cal">Calendar</h2>
          <div className="sign-up-btns">
            <button className="std-btn base cal">Book a Hangout</button>
            <button className="hollow-btn base cal">Add Availability</button>
          </div>
          <div id="calendar-box">
            <Cal />
          </div>
        </div>
      </React.Fragment>
    )
  }

  function bookHangout() {
    return (
      <React.Fragment>
        BOOK HANGOUT
      </React.Fragment>
    )
  }

  function addAvailability() {
    return (
      <React.Fragment>
        ADD AVAILABILITY
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