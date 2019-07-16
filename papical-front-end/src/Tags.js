import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Tags() {

  const [userTags, setUserTags] = useState([])

// Getting list of tags from current user
  useEffect( () => {
  
    const url = 'http://localhost:8000/users/'
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
      })
  
  }, [])

  const TagList = (tag) => {
    return (
      <li>{tag}</li>
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