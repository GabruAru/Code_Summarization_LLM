// ResetPassword.js
import React, { useState } from 'react';
import axios from 'axios';

const ResetPassword = () => {
  const [email, setEmail] = useState('');

  const handleResetPassword = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/reset_password', {
        email,
      });
      console.log(response.data);
    } catch (error) {
      console.error('Password reset request failed:', error);
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <form>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button type="button" onClick={handleResetPassword}>Reset Password</button>
      </form>
    </div>
  );
};

export default ResetPassword;
