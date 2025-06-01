import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar/Navbar';
import Landing_Page from './Components/Landing_Page/Landing_Page';


function App() {
  return (
    <>
    <BrowserRouter>
        <Navbar />
        <Routes>
          {<Route path="/" element={<Landing_Page/>}/>}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
