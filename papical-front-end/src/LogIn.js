import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

function LogIn({onLogInFunc}) {

  const [state, setState] = useState({
    username: '',
    password: '',
  });

  return (
  <div className="log-in-page">
    <h2 className="sign-up-header">Log In</h2>
    <input className="sign-up-input main" type='text' name='Username' placeholder='Username' onChange={(e) => setState({...state, username: e.target.value})}/>
    <input className="sign-up-input main" type='password' name='Password' placeholder='Password'onChange={(e) => setState({...state, password: e.target.value})}/>
    <NavLink className="std-btn base" to="/" onClick={() => onLogInFunc(state)}>Log In</NavLink>
  </div>
  )
};

export default LogIn;