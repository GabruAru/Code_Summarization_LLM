import React, { useState } from 'react';
import axios from 'axios';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [RegisterMessage, setRegisterMessage] = useState('');

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
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" name="username" onChange={handleInputChange} />
      </label>
      <label>
        Email:
        <input type="email" name="email" onChange={handleInputChange} />
      </label>
      <label>
        Password:
        <input type="password" name="password" onChange={handleInputChange} />
      </label>
      <button type="submit">Register</button>
      {RegisterMessage && <p>{RegisterMessage}</p>}
    </form>
  );
};

export default RegistrationForm;
