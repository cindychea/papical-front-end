import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

function LogIn({onLogInFunc}) {

  const [state, setState] = useState({
    username: '',
    password: '',
  });

  return (
  <div className="log-in-page">
      <input type='text' name='Username' placeholder='Username' onChange={(e) => setState({...state, username: e.target.value})}/>
      <input type='password' name='Password' placeholder='Password'onChange={(e) => setState({...state, password: e.target.value})}/>
      <NavLink to="/" onClick={() => onLogInFunc(state)}>Log In</NavLink>
  </div>
  )
};

export default LogIn;