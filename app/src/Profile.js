// Profile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
/*import './ProfileStyles.css';*/

const Profile = ({ setIsAuthenticated, isAuthenticated }) => {

  const navigate = useNavigate();
  console.log(isAuthenticated)
  // useEffect to check authentication status on component mount
  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const [users, setUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/profile');
        const { current_user, all_users } = response.data;

        if (current_user && all_users) {
          const currentUserId = current_user.id;
          const allUsersWithKey = all_users.map(user => ({ ...user, key: `user_${user.id}` }));

          setUsers([{ ...current_user, key: `user_${currentUserId}` }, ...allUsersWithKey]);
        } else {
          setUsers(response.data.map(user => ({ ...user, key: `user_${user.id}` })));
        }
      } catch (error) {
        console.error('Error fetching profiles:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/logout');

      if (response.data.message === 'Logout successful') {
        // Redirect to the login page
        setIsAuthenticated(false); 
        window.location.href = '/login';  
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleEdit = () => {
    // Toggle the editing state
    setIsEditing(!isEditing);
    window.location.href = '/edit';
  };

  return (
    <div>
      <h2>Your Dashboard</h2>
      {users.length > 0 && (
        <div className="dashboard-container">
          <div className="dashboard-user">
            <h3>Current User</h3>
            {isEditing ? (
              <div>
                <p>Edit Mode</p>
                {/* Include your form fields for editing */}
              </div>
            ) : (
              <div>
                <p>Username: {users[0].username}</p>
                {users[0].email && <p>Email: {users[0].email}</p>}
              </div>
            )}
            <button onClick={handleEdit}>{isEditing ? 'Cancel' : 'Edit'}</button>
            <button type="button" onClick={handleLogout}>Logout</button>
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
