import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Tags() {

  const [tags, setTags] = useState([])

// Getting current user information
  useEffect( () => {
  
    const url = 'http://localhost:8000/tags/'
    axios.get(url, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('accesstoken')}`
      } 
    }).then(function (response) {
        // handle success
        setTags(response.data)
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      
    }, [])
  
  const TagList = (tag) => {
    return (
      <li>{tag.name}</li>
    )
  }
  return (
    <div>
      <ul>
        {tags.map((tag) => TagList(tag))}
      </ul>
    </div>
  )
}

export default Tags;