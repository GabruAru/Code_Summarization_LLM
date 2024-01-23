// Output.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './chat.css'; // Import the CSS file for styling

const Output = ({ isAuthenticated }) => {
  const navigate = useNavigate();
  const [result, setResult] = useState('');

  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      navigate('/login');
    } else {
      // Fetch the result from the backend (adjust the API endpoint accordingly)
      // For example, you might want to include a unique identifier in the URL
      const fetchResult = async () => {
        try {
          const response = await fetch('http://127.0.0.1:5000/output');  // Adjust the API endpoint
          const data = await response.json();
          setResult(data.result);
        } catch (error) {
          console.error('Error fetching result:', error);
          // Handle the error as needed
        }
      };

      fetchResult();
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="output-container">
      <h2>Output</h2>
      <p>{result}</p>
    </div>
  );
};

export default Output;
