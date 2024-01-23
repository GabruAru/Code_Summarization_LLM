// App.js
import React , { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import Profile from './Profile';
import ResetPassword from './ResetPassword';
import EditProfile from './edit';
import Chat from './chat';
import Output from './output'
import './AppStyles.css';  // Import the CSS file

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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
            <li>
              <Link to="/output">Output</Link>
            </li>
          </ul>
        </nav>

        <div className="content">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated}  isAuthenticated={isAuthenticated}/>} />
            <Route path="/profile" element={<Profile setIsAuthenticated={setIsAuthenticated } isAuthenticated={isAuthenticated} />} />
            <Route path="/reset_password" element={<ResetPassword />} />
            <Route path="/chat" element={<Chat setIsAuthenticated={setIsAuthenticated}  isAuthenticated={isAuthenticated}  />} />
            <Route path="/edit" element={<EditProfile setIsAuthenticated={setIsAuthenticated}  isAuthenticated={isAuthenticated} />} />
            <Route path="/output" element={<Output setIsAuthenticated={setIsAuthenticated}  isAuthenticated={isAuthenticated} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
