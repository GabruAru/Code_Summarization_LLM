// Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'; // Import the CSS file for styling

const Login = ({ setIsAuthenticated, isAuthenticated}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/login', {
        email,
        password,
      });

      setLoginMessage(response.data.message);
      if (response.data.message === 'Login successful') {
        setIsAuthenticated(true); 
        console.log(isAuthenticated)
        navigate('/profile');
        
      } else if (response.data.message === 'Another user is already logged in') {
        setLoginMessage('Another user is already logged in.');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setLoginMessage('Login failed. Please check your credentials.');
    }
  };

  const handleResetPassword = () => {
    window.location.href = '/reset_password';
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="button" onClick={handleLogin}>Login</button>
        <button type="button" onClick={handleResetPassword}>Reset Password</button>

        {loginMessage && (
          <p className={loginMessage.includes('successful') ? 'success-message' : 'error-message'}>
            {loginMessage}
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
