import React from 'react';
import './Header.css';
import Thome from '../../Assets/Thome.jpg';
import Shome from '../../Assets/Shome.jpg';
import { Link } from 'react-router-dom';
function Header(props) {
  let role = props.user.role;
  return (
    (role === 0) ? (
      <header className="header-container">
        <div className="header-image">
          <img
            className="header-image-overlay"
            src={Shome}
            alt="Students's Home"
          />
        </div>
        <div className="header-content">
          <h1 className="header-title">Student Home Page</h1>
          <p className="header-welcome">Welcome, <span className='user-name-span'>{props.user.firstName}</span> </p>
          <div className="header-description">
            <p>
              This is a place for students to learn courses,
              and stay consistent.
            </p>
          </div>
          <button className="join-button"><Link to='/courses' style={{textDecoration:'none',color:'white'}} >Explore Courses</Link></button>
        </div>
      </header>
    ) : (
      <header className="header-container">
        <div className="header-image">
          <img
            className="header-image-overlay"
            src={Thome}
            alt="Teacher's Home"
          />
        </div>
        <div className="header-content">
          <h1 className="header-title">Teacher's Home Page</h1>
          <p className="header-welcome">Welcome, {props.user.fullName}</p>
          <div className="header-description">
            <p>
              This is a place for teachers to access resources, manage classes,
              and stay organized.
            </p>
          </div>
          <button className="join-button"><Link to='/AddCourse' style={{textDecoration:'none',color:'white'}} >Add Course</Link></button>
        </div>
      </header>
    )
  );
}

export default Header;
