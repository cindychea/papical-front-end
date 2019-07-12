import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Icon from './Icon.png'

function SignIn({onLogInFunc, onSignUpFunc}) {

  const [state, setState] = useState({
    username: '',
    password: '',
  });

  return (
  <div className="sign-in-page">
    <div className="sign-in">
      <h1 className="sign-in-title">Papical</h1>
      <h4>An App that makes planning hangouts with friends simple.</h4>
      Username <input type='text' name='Username' placeholder='Username' onChange={(e) => setState({...state, username: e.target.value})}/>
      Password <input type='password' name='Password' placeholder='Password'onChange={(e) => setState({...state, password: e.target.value})}/>
      <br />
      <NavLink to="/" onClick={() => onLogInFunc(state)}>Log In</NavLink>
      <p>or</p>
      <NavLink to="/signup" onClick={onSignUpFunc}>Sign Up</NavLink>
    </div>
    <div className="logo">
      <img className="papical-logo" src={Icon} alt="Papical Logo"/>
    </div>
  </div>
  )
};

export default SignIn;