import React, { useState } from 'react';
import { BrowserRouter, Route, Link } from "react-router-dom";
import axios from 'axios';
import Dashboard from "./Dashboard.js";
import Calendar from "./Calendar.js";
import Friends from "./Friends.js";
import Notifications from "./Notifications.js";
import User from "./User.js";
import SignIn from "./SignIn.js";
import LogIn from "./LogIn.js";
import SignUp from "./SignUp.js";
import './reset.css';
import './normalize.css';
import './App.css';
import Name2 from './pictures/Name2.png';

require('dotenv').config()

function AppRouter() {

  const [state, setState] = useState({
    isInsider: false,
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
        isInsider: true,
        isLoggedIn: true,
      });
    })
      .catch(function (error) {
        console.log(error);
      });
    }
    
    function onSignUpFunc() {
      setState({
        isInsider: true,
      });
    }
    
    function getActiveNav() {
      switch (state.isInsider && state.isLoggedIn) {
        case false:
          return outerNav();
        case true:
          return innerNav();
        default:
          return outerNav();
      }
    }
  
    function outerNav() {
      return (
        <React.Fragment>
          <nav className="nav outer">
            <div className="left-side">
            <img className="papical-logo-white" src={Name2} alt="Papical Logo"/>
            </div>
            <div className="right-side">
              <Link className="nav-hollow-btn" to="/login">Log In</Link>
              <Link className="nav-std-btn" to="/signup">Sign Up</Link>
            </div>
          </nav>
        </React.Fragment>
      )
    }
  
    function innerNav() {
      return (
        <React.Fragment>
          <nav className="nav inner">
          <img className="papical-logo-white" src={Name2} alt="Papical Logo"/>
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
              <li>
                <Link to="/notifications">Notifications</Link>
              </li>
              <li>
                <Link to="/user">User</Link>
              </li>
            </ul>
          </nav>
        </React.Fragment>
      )
    }
  
    return (
    <BrowserRouter>
      <div className="App">
        {getActiveNav()}
        <Route path="/" exact component={Dashboard} />
        <Route path="/calendar/" component={Calendar} />
        <Route path="/friends/" component={Friends} />
        <Route path="/notifications/" component={Notifications} />
        <Route path="/user/" component={User} />
        <Route path="/signup/" component={SignUp} />
        <Route path="/login/"
              render={(routeProps) => (
                <LogIn {...routeProps} onLogInFunc={onLogInFunc} />
              )} 
        />
        {state.isInsider ? '' : <SignIn onLogInFunc={onLogInFunc} onSignUpFunc={onSignUpFunc} />}
      </div>
    </BrowserRouter>
  );
}

export default AppRouter;
