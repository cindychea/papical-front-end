import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Tags() {

  const [userTags, setUserTags] = useState([])

// Getting list of tags from current user
  useEffect( () => {
  
    const url = 'http://localhost:8000/users/current/'
    axios.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accesstoken')}`
      } 
    }).then(function (response) {
        const currentUser = response.data
        setUserTags(currentUser.tag);
      })
      .catch(function (error) {
        // handle error
        // console.log(error);
        // console.log(error.response.data.code);
        const refreshUrl = 'http://localhost:8000/refresh/'
        if (error.response.data.code === 'token_not_valid') {
          axios.post(refreshUrl, {refresh: localStorage.getItem('refreshtoken')})
          .then(function (response) {
            localStorage.setItem('accesstoken', response.data.access)
          })
        }
      })
      .then(function(response) {
        const url = 'http://localhost:8000/users/current/'
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