import React from 'react';
import { request } from 'https';

function Dashboard() {
  return (
    <div className="dashboard">
      <h2 className="sign-up-header">Hi ~ user's first name here ~</h2>
      <div className="activity">
        <p>You have</p>
        {/* make these into links! */}
        <p>~number~ upcoming hangouts this week</p>
        <p>~number~ pending invitations</p>
      </div>
      <div>
        <p>Your weekly summary:</p>
        <button>Book a hangout</button>
        {/* add calendar */}
      </div>
    </div>
  )
}

export default Dashboard;