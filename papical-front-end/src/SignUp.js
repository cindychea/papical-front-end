import React, { useState }  from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

function SignUp() {

  const [state, setState] = useState({
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    password: '',
  });

  const onSubmit = (e) => {
    e.preventDefault()
    registerUser(state)
  }

  const registerUser = () => {
    // fix this... 400 bad request
    const url = "http://localhost:8000/users/"
    axios.post(url, {
      username: state.username,
      first_name: state.first_name,
      last_name: state.last_name,
      email: state.email,
      password: state.password,
      })
      .then(function(response) {
        console.log(response)
        OnboardingWizard()
      })
      .catch(function (error) {
        console.log(error);
      });
    // post to backend
    //  on success, redirect to OnboardingWizard
  }

  return (
  <div className="sign-up-base">
    <h2>Sign Up</h2>
    <form onSubmit={onSubmit}>
      <input type='text' name='FirstName' placeholder='First Name' onChange={(e) => setState({...state, first_name: e.target.value})}/>
      <input type='text' name='LastName' placeholder='Last Name' onChange={(e) => setState({...state, last_name: e.target.value})}/>
      <input type='email' name='Email' placeholder='Email' onChange={(e) => setState({...state, email: e.target.value})}/>
      <input type='text' name='Username' placeholder='Username' onChange={(e) => setState({...state, username: e.target.value})}/>
      <input type='password' name='Password' placeholder='Password'onChange={(e) => setState({...state, password: e.target.value})}/>
      <input type='submit' value='Continue' />
    </form>
  </div>
  )
}


function OnboardingWizard() {

  const [state, setState] = useState({
    tag: '',
    picture: '',
    friends: '',
    active: 'stepOne',
  });

  function getActiveStep() {
    console.log(state.active)
    switch (state.active) {
      case 'stepOne':
        return stepOne();
      case 'stepTwo':
        return stepTwo();
      case 'stepThree':
        return stepThree();
      case 'stepFour':
        return stepFour();
      default:
        return stepOne();
    }
  }

  function stepOne() {
    return (
      <div className="sign-up-one">
        <button onClick={() => {setState({...state, active: 'stepBase'})}}><span>&#8592;</span></button>
        <h2>Lets get you set up <span>(1/4)</span></h2>
        <input type='file' name='profilePicture' accept='image/*' onChange={(e) => setState({...state, picture: e.target.value})}/>
        <button onClick={() => {setState({...state, active: 'stepTwo'})}}>Continue</button>
        <button onClick={() => {setState({...state, active: 'stepTwo'})}}>Later</button>
      </div>
    )
  }

  function stepTwo() {
    return (
      <div className="sign-up-two">
        <button onClick={() => {setState({...state, active: 'stepOne'})}}><span>&#8592;</span></button>
        <h2>Lets get you set up <span>(2/4)</span></h2>
        <p>What are your interests/hobbies?</p>
        <p>(Separate each interest with a comma)</p>
        <input type='text' name='tag' placeholder='I am interested in...' onChange={(e) => setState({...state, tag: e.target.value})}/>
        <button onClick={() => {
          // Send request back to make a user, log in the user, get token
          setState({...state, active: 'stepThree'})
          }
          }>Continue</button>
        <button onClick={() => {setState({...state, active: 'stepThree'})}}>Later</button>
      </div>
    )
  }

  function stepThree() {
    return (
      <div className="sign-up-three">
        <button onClick={() => {setState({...state, active: 'stepTwo'})}}><span>&#8592;</span></button>
        <h2>Lets get you set up <span>(3/4)</span></h2>
        <p>Add your friends!</p>
        <p>(Separate each interest with a comma)</p>
        <input type='text' name='friends' placeholder='Search by username/name/email' onChange={(e) => setState({...state, friends: e.target.value})}/>
        <button onClick={() => {setState({...state, active: 'stepFour'})}}>Continue</button>
        <button onClick={() => {setState({...state, active: 'stepFour'})}}>Later</button>
      </div>
    )
  }

  function stepFour() {
    return (
      <div className="sign-up-four">
        <button onClick={() => {setState({...state, active: 'stepThree'})}}><span>&#8592;</span></button>
        <h2>Lets get you set up <span>(4/4)</span></h2>
        <p>Let your friends know when you're free to hangout this week.</p>
        <NavLink to="/">Done!</NavLink>
      </div>
    )
  }

  return (
    <React.Fragment>
      {console.log(state)}
      {getActiveStep()}
    </React.Fragment>
  )
}

export default SignUp;