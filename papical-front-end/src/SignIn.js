import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Icon from './pictures/Icon.png';
import Name from './pictures/Name.png';

function SignIn({onLogInFunc, onSignUpFunc}) {

  const [state, setState] = useState({
    username: '',
    password: '',
  });

  return (
  <div className="sign-in-page">
    <div className="sign-in">
      <img className="sign-in-title" src={Name} alt="Papical"/>
      <p className="sign-in-tagline">An app that makes planning hangouts with friends simple.</p>
      <div className="sign-in-box">
        <div><input className="sign-up-input main" type='text' name='Username' placeholder='Username' onChange={(e) => setState({...state, username: e.target.value})}/></div>
        <div><input className="sign-up-input main" type='password' name='Password' placeholder='Password'onChange={(e) => setState({...state, password: e.target.value})}/></div>
        <br />
        <div><NavLink className="hollow-btn" to="/" onClick={() => onLogInFunc(state)}>Log In</NavLink></div>
        <p className="or">or</p>
        <div><NavLink className="std-btn" to="/signup" onClick={onSignUpFunc}>Sign Up</NavLink></div>
      </div>
    </div>
    <div className="logo">
      <img className="papical-logo" src={Icon} alt="Papical Logo"/>
    </div>
  </div>
  )
};

export default SignIn;