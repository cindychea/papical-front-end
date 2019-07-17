import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Tags() {

  const [userTags, setUserTags] = useState([])

// Getting list of tags from current user
  useEffect( () => {
  
    const url = 'http://papicalapp.herokuapp.com/users/'
    axios.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accesstoken')}`
      } 
    }).then(function (response) {
        const currentUser = response.data[0]
        setUserTags(currentUser.tag);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        console.log(error.response.data.code);
        const refreshUrl = 'http://papicalapp.herokuapp.com/refresh/'
        if (error.response.data.code === 'token_not_valid') {
          axios.post(refreshUrl, {refresh: localStorage.getItem('refreshtoken')})
          .then(function (response) {
            localStorage.setItem('accesstoken', response.data.access)
          })
        }
      })
      .then(function(response) {
        const url = 'http://papicalapp.herokuapp.com/users/'
        axios.get(url, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accesstoken')}`
          } 
        })
      })
      .catch(function (error) {
        console.log(error);
      })
  
  }, [])

  const TagList = (tag) => {
    return (
      <li className="interest-list" key={tag.pk}>{tag}</li>
    )
  }
  return (
    <div>
      <ul>
        {userTags.map((tag) => TagList(tag))}
      </ul>
    </div>
  )
}

export default Tags;