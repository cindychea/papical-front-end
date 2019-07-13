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
    tag: '["rock climbing"]',
    picture: '',
    friends: '',
    active: 'stepBase',
  });

  const onSubmit = (e) => {
    console.log('form submitted')
    e.preventDefault()
    registerUser(state)
    setState({...state, active: 'stepThree'})
  }

  const registerUser = () => {
    console.log('registering')
    const url = "http://localhost:8000/users/"
    axios.post(url, {
      username: state.username,
      first_name: state.first_name,
      last_name: state.last_name,
      email: state.email,
      password: state.password,
      date_of_birth: null,
      gender: '',
      location: null,
      tag: state.tag,
      picture: null
      })
      .then(function(response) {
        console.log(response)

      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function stepBase() {
    return (
      <div className="sign-up-base">
      <h2>Sign Up</h2>
        <input type='text' name='FirstName' placeholder='First Name' onChange={(e) => setState({...state, first_name: e.target.value})}/>
        <input type='text' name='LastName' placeholder='Last Name' onChange={(e) => setState({...state, last_name: e.target.value})}/>
        <input type='email' name='Email' placeholder='Email' onChange={(e) => setState({...state, email: e.target.value})}/>
        <input type='text' name='Username' placeholder='Username' onChange={(e) => setState({...state, username: e.target.value})}/>
        <input type='password' name='Password' placeholder='Password' onChange={(e) => setState({...state, password: e.target.value})}/>
        <button type='button' onClick={() => {setState({...state, active: 'stepOne'})}}>Continue</button>
    </div>
    )
  }

  function stepOne() {
    return (
      <div className="sign-up-one">
        <button type='button' onClick={() => {setState({...state, active: 'stepBase'})}}><span>&#8592;</span></button>
        <h2>Lets get you set up <span>(1/4)</span></h2>
        <input type='file' name='profilePicture' accept='image/*' onChange={(e) => setState({...state, picture: e.target.value})}/>
        <button type='button' onClick={() => {setState({...state, active: 'stepTwo'})}}>Continue</button>
        <button type='button' onClick={() => {setState({...state, active: 'stepTwo'})}}>Later</button>
      </div>
    )
  }

  function stepTwo() {
    return (
      <div className="sign-up-two">
        <form onSubmit={onSubmit}>
          <button type='button' onClick={() => {setState({...state, active: 'stepOne'})}}><span>&#8592;</span></button>
          <h2>Lets get you set up <span>(2/4)</span></h2>
          <p>What are your interests/hobbies?</p>
          <p>(Separate each interest with a comma)</p>
          <input type='text' name='tag' placeholder='I am interested in...' />
          <button type='submit'>Continue Later</button>
        </form>
      </div>
      
      
    )
  }

  function stepThree() {
    return (
      <div className="sign-up-three">
        <button type='button' onClick={() => {setState({...state, active: 'stepTwo'})}}><span>&#8592;</span></button>
        <h2>Lets get you set up <span>(3/4)</span></h2>
        <p>Add your friends!</p>
        <p>(Separate each interest with a comma)</p>
        <input type='text' name='friends' placeholder='Search by username/name/email' onChange={(e) => setState({...state, friends: e.target.value})}/>
        <button type='button' onClick={() => {setState({...state, active: 'stepFour'})}}>Continue</button>
        <button type='button' onClick={() => {setState({...state, active: 'stepFour'})}}>Later</button>
      </div>
    )
  }

  function stepFour() {
    return (
      <div className="sign-up-four">
        <button type='button' onClick={() => {setState({...state, active: 'stepThree'})}}><span>&#8592;</span></button>
        <h2>Lets get you set up <span>(4/4)</span></h2>
        <p>Let your friends know when you're free to hangout this week.</p>
        <NavLink to="/">Done!</NavLink>
      </div>
    )
  }

  function getActiveStep() {
    console.log(state.active)
    switch (state.active) {
      case 'stepBase':
        return stepBase();
      case 'stepOne':
        return stepOne();
      case 'stepTwo':
        return stepTwo();
      case 'stepThree':
        return stepThree();
      case 'stepFour':
        return stepFour();
      default:
        return stepBase();
    }
  }

  return (
    <React.Fragment>
      {console.log(state)}
      {getActiveStep()}
    </React.Fragment>
  )
}

export default SignUp;