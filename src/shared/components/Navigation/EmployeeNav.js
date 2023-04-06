import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import "./NavLinks.css";

const EmployeeNav = (props) => {
  const auth = useContext(AuthContext);

  return (
    // <ul className="nav-links">
    //   {!auth.isLoggedIn && (
    //     <li>
    //       <NavLink to="/">{auth.isLoggedIn ? "HOME" : "LOGIN"}</NavLink>
    //     </li>
    //   )}
    //   {auth.isLoggedIn && (
    //     <li>
    //       <NavLink to="/view-profile">View Profile</NavLink>
    //     </li>
    //   )}
    //   <li>
    //     <NavLink to="/employee-details">Employee Details</NavLink>
    //   </li>
    //   <li>
    //     <NavLink to="/admin-details">Admin Details</NavLink>
    //   </li>
    //   <li>
    //     <NavLink to="/change-password">Change Password</NavLink>
    //   </li>

    //   <li>
    //     <button>LOGOUT</button>
    //   </li>
    // </ul>
    <ul className="nav-links">
      <li>
        <NavLink to="/">Home</NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/view-profile">View Profile</NavLink>
        </li>
      )}

      {auth.isLoggedIn && (
        <li>
          <NavLink to="/view-task">My Task</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/change-password">Change Passowrd</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/auth">AUTHENTICATE</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <button onClick={auth.logout}>LOGOUT</button>/
        </li>
      )}
    </ul>
  );
};

export default EmployeeNav;
