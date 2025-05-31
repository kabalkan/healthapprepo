import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';
import Landing_page from './components/Landing_Page/Landing_page';


function App() {
  return (
    <>
    <BrowserRouter>
        <Navbar />
        <Routes>
          {/* Define your Route components here */}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
