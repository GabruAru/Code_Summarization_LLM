import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/login', {
        email,
        password,
      });

      setLoginMessage(response.data.message); // Set the login message

      if (response.data.message === 'Login successful') {
        // You can perform additional actions upon successful login
        // For example, redirect to another page
        // window.location.href = '/dashboard';
        
      }
    } catch (error) {
      console.error('Login failed:', error);
      setLoginMessage('Login failed. Please check your credentials.');
    }
  };
  const handleLogout = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/logout');

      if (response.data.message === 'Logout successful') {
        // Redirect to the login page
        window.location.href = '/login';  
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="button" onClick={handleLogin}>Login</button>
        <button type="button" onClick={handleLogout}>Logout</button>

        {loginMessage && <p>{loginMessage}</p>}
      </form>
    </div>
  );
};

export default Login;
