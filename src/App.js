

import './App.css';
import React from 'react';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import AppState from './context/AppState';
import Profile from './components/Profile';
import SignUp from './components/SignUp';
import Login from './components/Login';

function App() {
  return (
    <>
      <Router>
        <AppState>
          <Navbar />
          <div className="container">
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route exact path='/profile' element={<Profile/>} />
              <Route exact path='/signup' element={<SignUp/>} />
              <Route exact path='/login' element={<Login/>} />
            </Routes>
          </div>
        </AppState>
      </Router>

    </>
  );
}

export default App;
