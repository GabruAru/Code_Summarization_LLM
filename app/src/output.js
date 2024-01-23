// Output.js
import React, { useState, useEffect } from 'react';
import { useNavigate , useLocation } from 'react-router-dom';
import MarkdownRenderer from './MarkdownRenderer';

import './chat.css'; // Import the CSS file for styling

const Output = ({ isAuthenticated }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [result, setResult] = useState(null);

    useEffect(() => {
      if (!isAuthenticated) {
        // Redirect to login if not authenticated
        navigate('/login');
      } 
    }, [isAuthenticated, navigate]);

    useEffect(() => {
        // Check if the result is available in the location state
        const resultFromLocation = location.state && location.state.result;
    
        if (resultFromLocation !== undefined) {
          setResult(resultFromLocation);
        } else {
          // Redirect to chat page if result is not available
          navigate('/chat');
        }
      }, [location.state, navigate]);
  
   
  return (
    <div className="output-container">
      <h2>Output</h2>

      {result !== null ? (
        <div>
          <MarkdownRenderer markdownContent={result} />
          {/* Display additional information as needed */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Output;