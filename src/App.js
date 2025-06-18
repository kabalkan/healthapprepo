import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';
import Landing_Page from './Components/Landing_Page/Landing_Page';
import Sign_Up from './Components/Sign_Up/Sign_Up';
import Login from './Components/Login/Login';
import BookConsultation from './Components/BookConsultation/BookConsultation';
import Notification from './Components/Notification/Notification';
import NotificationOverlay from './Components/Notification/NotificationOverlay';
import GiveReviews from './Components/ReviewForm/ReviewForm';
import { useEffect, useState } from 'react';

function App() {
  const [showNotification, setShowNotification] = useState(false);
  const [appointmentData, setAppointmentData] = useState(null);
  useEffect(() => {
    const stored = localStorage.getItem('appointment');
    if (stored) {
      setAppointmentData(JSON.parse(stored));
      setShowNotification(true);
    }
  }, []);

  const dismissNotification = () => {
    setShowNotification(false);
    setAppointmentData(null);
  };
  return (
    <>
    <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Landing_Page/>}/>
          <Route path="/Sign_Up" element={<Sign_Up/>}/>
          <Route path="/Login" element={<Login />} /> 
          <Route path="/BookConsultation" element={<BookConsultation />} />
          <Route path="/Notification" element={<Notification />} />
          <Route path="/Reviews" element={<GiveReviews />} />
        </Routes>
      </BrowserRouter>

    {/* Notification Overlay*/}
    {showNotification && appointmentData && (
      <NotificationOverlay appointment={appointmentData} onClose={dismissNotification} />
    )}
    </>
  );
}

export default App;