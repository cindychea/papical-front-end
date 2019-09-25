import React, { useState } from 'react';
import { BrowserRouter, Route, NavLink, Link, Redirect } from "react-router-dom";
import axios from 'axios';
import Dashboard from "./Dashboard.js";
import Calendar from "./Calendar.js";
import Friends from "./Friends.js";
import FriendProfile from "./FriendProfile";
import Notifications from "./Notifications.js";
import User from "./User.js";
import SignIn from "./SignIn.js";
import LogIn from "./LogIn.js";
import SignUp from "./SignUp.js";
import DropdownMenu from "./DropdownMenu.js";
import './reset.css';
import './normalize.css';
import './App.css';
import Name2 from './pictures/Name2.png';
import Bell from './pictures/Bell.svg';
import Profile from './pictures/Profile.png';

require('dotenv').config()

function AppRouter() {

  const [state, setState] = useState({
    isInsider: Boolean(localStorage.getItem('refreshtoken')),
    isLoggedIn: Boolean(localStorage.getItem('refreshtoken')),
    showDropdown: false
  });
  
  // const reload = () => {
  //   if( window.localStorage )
  //   {
  //     if( !localStorage.getItem( 'firstLoad' ) )
  //     {
  //       localStorage[ 'firstLoad' ] = true;
  //       window.location.reload();
  //     }  

  //     else
  //       localStorage.removeItem( 'firstLoad' );
  //   }
  // };

  function onLogInFunc({username, password}) {
    
    const urlToken = "http://localhost:8000/login/";
    // console.log('working', username, password)
    axios.post(urlToken, {
      username,
      password,
    })
    .then(function(response) {
      // console.log(response.data.access)
      localStorage.setItem('accesstoken', response.data.access)
      localStorage.setItem('refreshtoken', response.data.refresh)
      window.location.reload();
      setState({
        isInsider: true,
        isLoggedIn: true,
      });
    })
      .catch(function (error) {
        console.log(error);
      });
    }

    function onLogInFuncSignUp({username, password}) {
    
      const urlToken = "http://localhost:8000/login/";
      // console.log('working', username, password)
      axios.post(urlToken, {
        username,
        password,
      })
      .then(function(response) {
        // console.log(response.data.access)
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

    function onLogOut(e) {
      e.preventDefault()
      localStorage.removeItem('accesstoken')
      localStorage.removeItem('refreshtoken')
      setState({...state, isLoggedIn: false, isInsider: false});
      // console.log(state)
      // console.log(localStorage.getItem('refreshtoken'))
    }

    function onDropdownClick(e) {
      e.preventDefault();
      if (state.isLoggedIn === true && state.showDropdown === false) {
        setState({...state, showDropdown: true})
      } else if (state.showDropdown === true) {
        setState({...state, showDropdown: false})
      }
    }

    function closeDropdown(e) {
      e.preventDefault();
      if (state.showDropdown === true) {
        const logout = document.getElementById('logout')
        if (e.target !== logout) {
          setState({...state, showDropdown: false})
        }
      } else {
        state.showDropdown = false
      }
    }
    
    function getActiveNav() {
      switch (state.isInsider && state.isLoggedIn) {
        case false:
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
              <NavLink to="/">
                <img className="papical-logo-white" src={Name2} alt="Papical Logo"/>
              </NavLink>
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
            <div className="left-side">
              <NavLink to="/">
                <img className="papical-logo-white" src={Name2} alt="Papical Logo"/>
              </NavLink>
            </div>
            <div className="right-side">
              <Link className="nav-hollow-btn inner" to="/">Dashboard</Link>
              <Link className="nav-hollow-btn inner" to="/calendar">Calendar</Link>
              <Link className="nav-hollow-btn inner" to="/friends">Friends</Link>
              <Link to="/notifications"><img className="bell" src={Bell} alt="Notifications"/></Link>
              <img className="profile" src={Profile} alt="Profile" onClick={onDropdownClick} />
              {state.showDropdown ? <DropdownMenu onLogOut={onLogOut} /> : ''}
            </div>
          </nav>
        </React.Fragment>
      )
    }
    
    return (
    <BrowserRouter>
      <div className="App">
        <div onClick={closeDropdown}>
          {getActiveNav()}
          <Route exact path="/" component={Dashboard} />
          <Route path="/calendar/" component={Calendar} />
          <Route path="/friends/" component={Friends} />
          <Route path="/friendprofile/" component={FriendProfile} />
          <Route path="/notifications/" component={Notifications} />
          <Route path="/user/" component={User} />
        </div>
        <Route path="/signup/" 
              render={(routeProps) => (
                <SignUp {...routeProps} onFormSubmit={onLogInFuncSignUp} />
                )} 
                />
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
