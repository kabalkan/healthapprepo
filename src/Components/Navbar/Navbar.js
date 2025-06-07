import './Navbar.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function handleClick() {
  console.log("Button clicked!");
}

function Navbar() {
  const [username, setUsername] = useState("");

  useEffect(() => {
        const storedUsername = sessionStorage.getItem("username");
        if (storedUsername) {
        // Capitalize first letter
        const capitalized = storedUsername.charAt(0).toUpperCase() + storedUsername.slice(1);
        setUsername(capitalized);
        }
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
            {username && (
        <li className="link welcome-message">Welcome, {username}</li>
            )}

        <li className="link logout-button">
            <Link to="/Sign_Up" className="logout-link">Logout</Link>
        </li>
        </ul>
    </nav>
</div>
  );
}
export default Navbar;