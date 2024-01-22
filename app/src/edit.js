// EditProfile.js
import React, { useState } from 'react';
import axios from 'axios';
/*import './style.css';*/

const EditProfile = ({ userId, currentUsername, currentEmail, onCancel, onUpdate }) => {
  const [newUsername, setNewUsername] = useState(currentUsername || ''); // Set a default value or an empty string
  const [newEmail, setNewEmail] = useState(currentEmail || ''); // Set a default value or an empty string
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleUpdate = async () => {
    try {
      const response = await axios.put(`http://127.0.0.1:5000/edit`, {
        username: newUsername,
        email: newEmail,
        password,
      });

      if (response.data.message === 'Update successful') {
        window.location.href = '/profile';
      } else {
        setError('Update failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Update failed:', error);
      setError('Update failed. Please check your credentials.');
    }
  };

  return (
    <div>
      <h2>Edit Profile</h2>
      <label>
        New Username:
        <input type="text" value={newUsername} onChange={(e) => setNewUsername(e.target.value)} />
      </label>
      <label>
        New Email:
        <input type="email" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button onClick={handleUpdate}>Update</button>
      <button onClick={onCancel}>Cancel</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default EditProfile;
