// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UserRegistration from './components/RegistrationForm';
import UserListing from './components/UserList';
import './App.css';

function App() {
  return (
    <Router>
      <div className="container mt-5">
        <Routes>
          <Route path="/" element={<UserRegistration />} />
          <Route path="/register" element={<UserRegistration />} />
          <Route path="/users" element={<UserListing />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;