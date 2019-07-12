import React, { useState } from 'react';

function SignIn({onLogInFunc}) {

  const [state, setState] = useState({
    username: '',
    password: '',
  });

  return <div className="sign-in-page">
      <input type='text' name='Username' placeholder='Username' onChange={(e) => setState({...state, username: e.target.value})}/>
      <input type='password' name='Password' placeholder='Password'onChange={(e) => setState({...state, password: e.target.value})}/>
      <button onClick={() => onLogInFunc(state)}>Log In</button>
      <button>Sign Up</button>
  </div>
}

export default SignIn;