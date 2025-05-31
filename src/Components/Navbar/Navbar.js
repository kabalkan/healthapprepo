import './Navbar.css';

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
            <a href="../Landing_Page/LandingPage.html">Home</a>
          </li>
          <li className="link">
            <a href="../Appointments/Appointments.html">Book Appointments</a>
          </li>
          <li className="link">
            <a href="../Sign_Up/Sign_Up.html">Sign Up</a>
          </li>
          <li className="link">
            <a href="../Login/Login.html">Login</a>
          </li>
        </ul>
    </nav>
</div>
  );
}
export default Navbar;