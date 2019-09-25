import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function SearchFriends() {
  
  const searchBar = document.getElementById('friend-search');

  const [listOfUsers, setListOfUsers] = useState([]);
  const [results, setResults] = useState([]);
  const [state, setState] = useState({
    query: '',
  });

// GETTING LIST OF USERS
  useEffect( () => {
  
    const url = 'http://localhost:8000/users/'
    axios.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accesstoken')}`
      } 
    }).then(function (response) {
        // handle success
        setListOfUsers(response.data)
      })
      .catch(function (error) {
        const refreshUrl = 'http://localhost:8000/refresh/'
        if (error.response.data.code === 'token_not_valid') {
          axios.post(refreshUrl, {refresh: localStorage.getItem('refreshtoken')})
          .then(function (response) {
            localStorage.setItem('accesstoken', response.data.access)
          })
          .then(function(response) {
            const url = 'http://localhost:8000/users/'
            axios.get(url, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('accesstoken')}`
              } 
            })
          })
        }
      })
      .catch(function (error) {
        console.log(error);
      })
  }, [])

  const getResults = () => {
    const users = listOfUsers.filter(user => 
      // user.pk !== currentUser.pk &&
      (user.username.toLowerCase().includes(state.query) ||
      user.first_name.toLowerCase().includes(state.query) ||
      user.last_name.toLowerCase().includes(state.query) ||
      user.email.toLowerCase().includes(state.query))
      )
      setResults(users)
      // console.log(results)
  }

  const Suggestions = (result) => {
    const user = result

    const imageUrl = (user.picture === null) ? `http://localhost:8000/media/images/profile_icon.svg` : `http://localhost:8000/${user.picture}`

    if (state.query.length > 1) {

      return (
        <Link id="notif-friend" to={{
          pathname: "/friendprofile",
          friendProfileProps:{
            friend: user
          }
        }} key={user.pk} className="friend-search">
        <img src={`${imageUrl}`} alt={user.username} className="friends-photo"/>
        <p className="friend-name">{user.first_name} {user.last_name}</p>
        </Link>
      )
    }
  }

  const handleInputChange = () => {
    setState({
      query: searchBar.value
    })
    if (state.query && state.query.length > 1) {
      if (state.query.length % 2 === 0) {
        getResults()
      }
    } else if (!state.query) {
      }
    }

  return (
    <div className="search-bar">
      <div className="control-row">
        <input
          id='friend-search'
          className="sign-up-input italics friend"
          type='text'
          name='friends'
          placeholder='Search by username/name/email'
          onChange={handleInputChange}
          />
        {/* <button className="std-btn base">Add friends</button> */}
      </div>
      <div className="friend-search-list">
        {results.map((result) => Suggestions(result))}
      </div>
    </div>
  )
}

export default SearchFriends;