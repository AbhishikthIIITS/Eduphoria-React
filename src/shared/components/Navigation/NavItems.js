import React from "react";
import "./NavItems.css";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../Slices/AuthSlice"; 
const NavItems = () => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  
  const dispatch = useDispatch();
  

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <ul className="nav-items">
      <li>
        <NavLink to="/" >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/courses">Courses</NavLink>
      </li>
      <li>
        <NavLink to="/about">About</NavLink>
      </li>
      <li>
        <NavLink to="/help">FAQ</NavLink>
      </li>
      {!loggedIn && (
        <>
          <li>
            <NavLink to="/signup">Sign Up</NavLink>
          </li>
          <li>
            <NavLink to="/signin">Sign In</NavLink>
          </li>
        </>
      )}

      {loggedIn && (
        <>
          <li>
           <button className="pro-btn"><NavLink to="/profile">Profile</NavLink></button> 
          </li>
          <li>
            <button onClick={handleLogout} className="logout-btn" >Logout</button>
          </li>
        </>
      )}
    </ul>
  );
};

export default NavItems;
