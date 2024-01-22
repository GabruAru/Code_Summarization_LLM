// Register.js
import React, { useState } from 'react';
import axios from 'axios';
import './RegistrationForm.css'; // Import the CSS file for styling

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [registerMessage, setRegisterMessage] = useState('');

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:5000/register', formData);
      setRegisterMessage(response.data.message);
      console.log(response.data); // Handle success or display a message to the user
      setTimeout(() => {
        window.location.href = '/login';
      }, 1000); // Adjust the delay as needed
    } catch (error) {
      console.error('Registration failed', error);
      if (error.response && error.response.status === 400) {
        // Handle specific error response (email already in use)
        setRegisterMessage(error.response.data.message);
      } else {
        setRegisterMessage('Registration failed');
      }
    }
  };

  return (
    <div className="registration-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input type="text" name="username" onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" name="email" onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input type="password" name="password" onChange={handleInputChange} />
        </div>
        <button type="submit">Register</button>
        {registerMessage && (
          <p className={registerMessage.includes('successful') ? 'success-message' : 'error-message'}>
            {registerMessage}
          </p>
        )}
      </form>
    </div>
  );
};

export default RegistrationForm;
