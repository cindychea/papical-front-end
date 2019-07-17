import React from 'react';

function FriendProfile(props) {

  const friend = props.location.friendProfileProps.friend
  console.log(friend);

  const imageUrl = (friend.picture === null) ? `http://localhost:8000/media/images/profile_icon.svg` : `http://localhost:8000${friend.picture}`

  return (
    <section>
      <h2 className="sign-up-header">Profile</h2>
        <div>
          <img src={`${imageUrl}`} alt={friend.username} className="photo-holder"/>
          <p>{friend.first_name} {friend.last_name}</p>
          <p>{friend.email}</p>
          <p>{friend.username}</p>
        </div>
    </section>
  )
}

export default FriendProfile;