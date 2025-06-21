import './Navbar.css';
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';

function handleClick() {
  console.log("Button clicked!");
}

function Navbar() {
  const [username, setUsername] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef();
  useEffect(() => {
    const storedUsername = sessionStorage.getItem('username');
    if (storedUsername) {
      const capitalized = storedUsername.charAt(0).toUpperCase() + storedUsername.slice(1);
      setUsername(capitalized);
    }
  }, []);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div>
    <nav>
        <div className="nav__logo">
          <div href="/">
            StayHealthy
          </div>
          <span>.</span>
        </div>
        <div className="nav__icon" onClick={handleClick}>
          <i className="fa fa-times fa fa-bars"></i>
        </div>

        <ul className="nav__links active">
        <li className="link">
            <Link to="/">Home</Link>
        </li>
            <li className="link">
            <Link to="/Appointments">Book Appointments</Link>
        </li>

        <li className="link">
            <Link to="/Sign_Up">Sign Up</Link>
        </li>
        <li className="link">
            <Link to="/Login">Login</Link> 
        </li>
            
        {/* Welcome message with dropdown */}
        {username && (
          <li className="link welcome-user" ref={dropdownRef}>
            <span onClick={() => setShowDropdown((prev) => !prev)}>
              Welcome, {username} ▼
            </span>
            {showDropdown && (
              <div className="dropdown-menu">
                <Link to="/Profile">My Profile</Link>
                <Link to="/Reports">My Reports</Link>
                <button
                  onClick={() => {
                    sessionStorage.clear();
                    window.location.reload();
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </li>
        )}

        {/* <li className="link logout-button">
            <Link to="/Sign_Up" className="logout-link">Logout</Link>
        </li> */}
        </ul>
    </nav>
</div>
  );
}
export default Navbar;