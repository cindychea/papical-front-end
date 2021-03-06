import React, { useState }  from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Cal from './Cal.js';
import SearchFriends from './SearchFriends.js';
import BackArrow from './pictures/BackArrow.png';

function SignUp({onFormSubmit}) {

  const [state, setState] = useState({
    first_name: '',
    last_name: '',
    email: '',
    username: '',
    password: '',
    tag: [],
    picture: null,
    picture_preview: null,
    friends: '',
    active: 'stepBase',
    // active: localStorage.getItem('refreshtoken') ? '' : 'stepBase',
  });

  // function onFileSelect(event) {
  //   var imageFile = document.getElementById("file");
  //   console.log(imageFile.files[0].type);
  //   setState({...state, picture: imageFile.files[0]});
  // }

  const handleImageChange = () => {
    // setState({...state, image: e.target.files[0]})
    var imageFile = document.getElementById("file");
    setState({...state, picture: imageFile.files[0], picture_preview: URL.createObjectURL(imageFile.files[0])});
  };

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(state);
    registerUser(state);
    setState({...state, active: 'stepThree'})
  }

  const registerUser = () => {
    // console.log('registering')
    let form_data = new FormData();
    form_data.append('username', state.username);
    form_data.append('first_name', state.first_name);
    form_data.append('last_name', state.last_name);
    form_data.append('email', state.email);
    form_data.append('password', state.password);
    form_data.append('picture', state.picture);
    form_data.append('location', null);
    form_data.append('tag', state.tag);

    const url = "http://localhost:8000/users/"
    axios.post(url, form_data, {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
      // {
      // username: state.username,
      // first_name: state.first_name,
      // last_name: state.last_name,
      // email: state.email,
      // password: state.password,
      // date_of_birth: null,
      // picture: state.picture,
      // gender: '',
      // location: null,
      // tag: state.tag,
      // }
      )
      .then(function(response) {
        console.log(response)
        let stateReg = {
          username: state.username,
          password: state.password,
        }
        // console.log(stateReg)
        onFormSubmit(stateReg)
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function stepBase() {
    return (
      <div className="sign-up-base">
      <h2 className="sign-up-header">Sign Up</h2>
        <input className="sign-up-input" type='text' name='FirstName' placeholder='First Name' onChange={(e) => setState({...state, first_name: e.target.value})}/>
        <input className="sign-up-input" type='text' name='LastName' placeholder='Last Name' onChange={(e) => setState({...state, last_name: e.target.value})}/>
        <input className="sign-up-input" type='email' name='Email' placeholder='Email' onChange={(e) => setState({...state, email: e.target.value})}/>
        <input className="sign-up-input" type='text' name='Username' placeholder='Username' onChange={(e) => setState({...state, username: e.target.value})}/>
        <input className="sign-up-input" type='password' name='Password' placeholder='Password' onChange={(e) => setState({...state, password: e.target.value})}/>
        <button className="std-btn base" type='button' onClick={() => {setState({...state, active: 'stepOne'})}}>Sign Up</button>
    </div>
    )
  }

  function stepOne() {
    return (
      <React.Fragment>
        <div className="sign-up-one-box">
          <div className="back-button-box">
            <button className="back-button" type='button' onClick={() => {setState({...state, active: 'stepBase'})}}>
              <img src={BackArrow} alt="Back to Previous Page"></img>
            </button>
          </div>
          <div className="sign-up-one">
            <h2 className="sign-up-header">Lets get you set up <span>(1/4)</span></h2>
            <div className="progress-box">
              <div className="progress filled"></div>
              <div className="progress"></div>
              <div className="progress"></div>
              <div className="progress"></div>
            </div>
            <div className="photo-section">
              <div className="photo-box">
                <div className="photo-holder su">
                  <img src={state.picture_preview} className="photo-holder su"></img>
                </div>
                <label className="photo-upload-label" id="add-photo" htmlFor="file">Add photo</label>
                <input className="photo-upload" id='file' type='file' accept="image/png, image/jpeg" name='profilePicture' onChange={handleImageChange}/>
              </div>
              <div className="photo-text">
                <p className="sign-in-tagline photo">Add a photo so your friends can find you easily.</p>
              </div>
            </div>
            <div className="sign-up-btns">
              <button className="std-btn base plus" type='button' onClick={() => {setState({...state, active: 'stepTwo'})}}>Continue</button>
              <button className="hollow-btn plus" type='button' onClick={() => {setState({...state, active: 'stepTwo'})}}>Skip</button>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }

  function stepTwo() {
    return (
      <React.Fragment>
        <div className="sign-up-two-box">
          <div className="back-button-box">
            <button className="back-button" type='button' onClick={() => {setState({...state, active: 'stepOne'})}}>
              <img src={BackArrow} alt="Back to Previous Page"></img>
            </button>
          </div>
          <div className="sign-up-two">
            <form className="interest-form" onSubmit={onSubmit}>
              <h2 className="sign-up-header">Lets get you set up <span>(2/4)</span></h2>
              <div className="progress-box two">
                <div className="progress filled"></div>
                <div className="progress filled"></div>
                <div className="progress"></div>
                <div className="progress"></div>
              </div>
              <div className="interests-section">
                <p className="sign-in-tagline">What are your interests and hobbies?</p>
                <p className="sign-in-tagline">(Separate each interest with a comma)</p>
                <br></br>
                <input className="sign-up-input italics" type='text' name='tag' placeholder='I am interested in...' onChange={(e) => setState({...state, tag: e.target.value})}/>
                <div className="sign-up-btns">
                  <button className="submit-form" type='submit'><span className="std-btn base plus">Continue</span><span className="hollow-btn plus">Skip</span></button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
      
    )
  }

  function stepThree() {
    return (
      <React.Fragment>
        <div className="sign-up-three-box">
          <div className="back-button-box">
            <button className="back-button" type='button' onClick={() => {setState({...state, active: 'stepTwo'})}}>
              <img src={BackArrow} alt="Back to Previous Page"></img>
            </button>
          </div>
          <div className="sign-up-three">
            <h2 className="sign-up-header">Lets get you set up <span>(3/4)</span></h2>
            <div className="progress-box three">
              <div className="progress filled"></div>
              <div className="progress filled"></div>
              <div className="progress filled"></div>
              <div className="progress"></div>
            </div>
            <div className="friends-section">
              <p className="sign-in-tagline">Add your friends!</p>
              <SearchFriends/>
            </div>
            <div className="sign-up-btns">
              <button className="std-btn base plus" type='button' onClick={() => {setState({...state, active: 'stepFour'})}}>Continue</button>
              <button className="hollow-btn plus" type='button' onClick={() => {setState({...state, active: 'stepFour'})}}>Skip</button>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }

  function stepFour() {
    return (
      <React.Fragment>
        <div className="sign-up-four-box">
          <div className="back-button-box">
            <button className="back-button" type='button' onClick={() => {setState({...state, active: 'stepThree'})}}>
              <img src={BackArrow} alt="Back to Previous Page"></img>
            </button>
          </div>
          <div className="sign-up-four">
            <h2 className="sign-up-header four">Lets get you set up <span>(4/4)</span></h2>
            <div className="progress-box four">
              <div className="progress filled"></div>
              <div className="progress filled"></div>
              <div className="progress filled"></div>
              <div className="progress filled"></div>
            </div>
            <div className="calendar-section">
              <p className="sign-in-tagline cal">You're all set! Go to the calendar so your friends know when you're free or to book a hangout.</p>
            </div>
            <div id="sign-up-calendar-box">
              <Cal />
            </div>
            <div className="sign-up-btns cal">
              <NavLink to="/"><span className="std-btn base plus">Done!</span></NavLink>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }

  function getActiveStep() {
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
      {getActiveStep()}
    </React.Fragment>
  )
}

export default SignUp;