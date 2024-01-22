// Profile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/profile');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching profiles:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Profiles</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.username} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
