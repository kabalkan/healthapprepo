import './Navbar.css';
function handleClick() {
  console.log("Button clicked!");
}
import { Link } from 'react-router-dom';
function Navbar() {
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
            <a href="../Appointments/Appointments.html">Book Appointments</a>
          </li>
          <li className="link">
            {/* <a href="../Sign_Up/Sign_Up.html">Sign Up</a> */}
            <Link to="/Sign_Up">Sign Up</Link>
          </li>
          <li className="link">
            <a href="../Login/Login.html">Login</a>
          </li>

          <li className="link logout-button">
            <Link to="/Sign_Up" className="logout-link">Logout</Link>
          </li>
        </ul>
    </nav>
</div>
  );
}
export default Navbar;