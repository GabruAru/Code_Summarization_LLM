// Profile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ProfileStyles.css';

const Profile = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/profile');
      const { current_user, all_users } = response.data;

      if (current_user && all_users) {
        // If the response has both current_user and all_users, use them
        const currentUserId = current_user.id;
        const allUsersWithKey = all_users.map(user => ({ ...user, key: `user_${user.id}` }));

        setUsers([{ ...current_user, key: `user_${currentUserId}` }, ...allUsersWithKey]);
      } else {
        // Fallback to the original behavior if the structure is different
        setUsers(response.data.map(user => ({ ...user, key: `user_${user.id}` })));
      }
    } catch (error) {
      console.error('Error fetching profiles:', error);
    }
  };

  fetchUsers();
}, []);


return (
  <div>
    <h2>Your Dashboard</h2>
    {users.length > 0 && (
      <div className="dashboard-container">
        <div className="dashboard-user">
          <h3>Current User</h3>
          <p>Username: {users[0].username}</p>
          {users[0].email && <p>Email: {users[0].email}</p>}
        </div>
        <div className="profiles-container">
          <h3>Users</h3>
          {users.slice(1).map(user => (
            <div key={user.key} className="profile-card">
              <p>{user.username}</p>
              {user.email && <p>Email: {user.email}</p>}
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);
};

export default Profile;
