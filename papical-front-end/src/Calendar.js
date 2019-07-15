import React from 'react';
import Cal from './Cal.js';

function Calendar() {

  return (
    <div className="calendar">
      <h2 className="sign-up-header cal">Calendar</h2>
      <button className="std-btn base cal">Add Item</button>
      <div id="calendar-box">
        <Cal />
      </div>
    </div>
  )
}

export default Calendar;