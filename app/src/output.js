// Output.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './chat.css'; // Import the CSS file for styling

const Output = ({ isAuthenticated }) => {
    const navigate = useNavigate();
    const [results, setResult] = useState(null);
  
    useEffect(() => {
      if (!isAuthenticated) {
        // Redirect to login if not authenticated
        navigate('/login');
      } else {
        // Make an API call to fetch the result from the backend
        axios.get('http://127.0.0.1:5000/chat')
          .then(response => {
            setResult(response.data.result);
          })
          .catch(error => {
            console.error('Error fetching result:', error);
          });
      }
    }, [isAuthenticated, navigate]);
  
    return (
      <div className="output-container">
        <h2>Output</h2>
  
        {results !== null ? (
          <div>
            <p>Result: {results}</p>
            {/* Display additional information as needed */}
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
  };
  
  export default Output;