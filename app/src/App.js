// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Profile from './Profile';
import ResetPassword from './ResetPassword';
import EditProfile from './edit';
import Chat from './chat';
import './AppStyles.css';  // Import the CSS file

const App = () => {
  return (
    <Router>
      <div className="container">
        <nav className="sidebar">
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
              <Link to="/chat">Chat</Link>
            </li>
            <li>
              <Link to="/edit">Edit Profile</Link>
            </li>
          </ul>
        </nav>

        <div className="content">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/reset_password" element={<ResetPassword />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/edit" element={<EditProfile />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
