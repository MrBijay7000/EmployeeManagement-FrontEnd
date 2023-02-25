import React from "react";
import { NavLink } from "react-router-dom";

import "./NavLinks.css";

const NavLinks = (props) => {
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/">HOME</NavLink>
      </li>

      <li>
        <NavLink to="/view-profile">View Profile</NavLink>
      </li>

      <li>
        <NavLink to="/employee-details">Employee Details</NavLink>
      </li>

      <li>
        <NavLink to="/change-password">Change Password</NavLink>
      </li>

      <li>
        <button>LOGOUT</button>
      </li>
    </ul>
  );
};

export default NavLinks;
