// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Profile from './Profile';
import ResetPassword from './ResetPassword';

import Chat from './chat';

const App = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/register">Register</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/reset_password">Reset Password</Link>
            </li>
    
            <li>
            <Link to="/chat">chat</Link>  
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/reset_password" element={<ResetPassword />} />
          <Route path="/chat" element = {<Chat />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
