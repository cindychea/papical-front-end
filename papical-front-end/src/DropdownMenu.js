import React from 'react';
import { NavLink } from "react-router-dom";

function DropdownMenu ({onLogOut}) {

  return (
    <div className="menu-container">
      <div className="menu">
        <NavLink to="/user">Profile</NavLink>
        <NavLink to="/" id="logout" onClick={onLogOut}>Logout</NavLink>
      </div>
    </div>
  )
}

export default DropdownMenu;