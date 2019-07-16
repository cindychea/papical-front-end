import React, {useState} from 'react';
import { NavLink } from "react-router-dom";
import Profile from './pictures/Profile.png';


function DropdownMenu ({onLogOut}) {

  return (
    <section>
      <div className="menu">
        <NavLink to="/user">Profile</NavLink>
        <NavLink to="/" onClick={onLogOut}>Logout</NavLink>
      </div>
    </section>
  )
}

export default DropdownMenu;