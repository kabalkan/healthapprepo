// Following code has been commented with appropriate comments for your reference.
import React, { useEffect, useState } from 'react';
import Navbar from '../Navbar/Navbar';
import './Notification.css';

// Function component Notification to display user notifications
const Notification = ({ children }) => {
  // State variables to manage user authentication, username, doctor data, and appointment data
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [doctorData, setDoctorData] = useState(null);
  const [appointmentData, setAppointmentData] = useState(null);

  useEffect(() => {
    const storedUsername = sessionStorage.getItem('email');
    const storedAppointmentData = JSON.parse(localStorage.getItem("appointment"));

    if (storedUsername) {
      setIsLoggedIn(true);
      setUsername(storedUsername);
    }

    if (storedAppointmentData) {
      setAppointmentData(storedAppointmentData);
    }
  }, []);

  // Return JSX elements to display Navbar, children components, and appointment details if user is logged in
  return (
    <div>
      {/* Render Navbar component */}
      <Navbar ></Navbar>
      {/* Render children components */}
      {children}
      {/* Display appointment details if user is logged in and appointmentData is available */}
      

      {isLoggedIn && appointmentData && (
  <div className="notification-toast">
        <div className="appointment-card__content">
          <h3 className="appointment-card__title">Appointment Details</h3>
          <p className="appointment-card__message">
            <strong>Doctor:</strong> {appointmentData.doctorName}<br />
            <strong>Speciality:</strong> {appointmentData.speciality}<br />
            <strong>User:</strong> {appointmentData.patientName || username}<br />
            <strong>Phone:</strong> {appointmentData.phone}<br />
            <strong>Date:</strong> {appointmentData.date}<br />
            <strong>Time:</strong> {appointmentData.time}
          </p>
        </div>
      </div>
)}

    </div>
  );
};

// Export Notification component for use in other parts of the application
export default Notification;