import React, { useState } from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";
import axios from 'axios';
import Dashboard from "./Dashboard.js";
import Calendar from "./Calendar.js";
import Friends from "./Friends.js";
import SignIn from "./SignIn.js";
import './App.css';

require('dotenv').config()

function AppRouter() {

  const [state, setState] = useState({
    isLoggedIn: false,
  });

  function onLogInFunc({username, password}) {
    
    const urlToken = "http://localhost:8000/login/";
    // console.log('working', username, password)
    axios.post(urlToken, {
      username,
      password,
      })
      .then(function(response) {
        console.log(response.data.access)
        localStorage.setItem('accesstoken', response.data.access)
        localStorage.setItem('refreshtoken', response.data.refresh)
        setState({
          isLoggedIn: true,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <BrowserRouter>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Dashboard</Link>
            </li>
            <li>
              <Link to="/calendar">Calendar</Link>
            </li>
            <li>
              <Link to="/friends">Friends</Link>
            </li>
          </ul>
        </nav>

        <h1>Papical</h1>
        <Route path="/" exact component={Dashboard} />
        <Route path="/calendar/" component={Calendar} />
        <Route path="/friends/" component={Friends} />
        {state.isLoggedIn ? '' : <SignIn onLogInFunc={onLogInFunc}></SignIn>}
        
      </div>
    </BrowserRouter>
  );
}

export default AppRouter;
