import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './chat.css'; // Import the CSS file for styling

const Chat = ({ isAuthenticated }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      // Redirect to login if not authenticated
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);


  const [language, setLanguage] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [codeToExplain, setCodeToExplain] = useState('');
  const [desiredOutput, setDesiredOutput] = useState('');
  const [selectedTone, setSelectedTone] = useState('Professional');
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  const handleFormSubmit = async () => {
    try {
      // Make a POST request to the /chat endpoint with the input values
      const response = await axios.post('http://127.0.0.1:5000/chat', {
        language,
        additionalInfo,
        codeToExplain,
        desiredOutput,
        selectedTone,
        selectedLanguage,
      });

      // Handle the response as needed
      console.log(response.data);

      // Redirect or do other actions based on the response
      window.location.href = '/output';
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle the error as needed
    }
  };

  return (
    <div className="chat-container">
      <h2>Code Summarization Chat</h2>

      <div className="form-group">
        <label>
          Language / Software:
          <input
            type="text"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            placeholder="> C#, HTML, Excel..."
          />
        </label>
      </div>

      <div className="form-group">
        <label>
          Additional Information (Optional):
          <textarea
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
            placeholder="> Description of what to do (optional)..."
            rows="4" // Adjust the number of rows as needed
          />
        </label>
      </div>

      <div className="form-group">
        <label>
          Code to Explain:
          <textarea
            value={codeToExplain}
            onChange={(e) => setCodeToExplain(e.target.value)}
            placeholder="> Copy your code here..."
            rows="8" // Adjust the number of rows as needed
          />
        </label>
      </div>

      <div className="options-container">
        <div className="form-group">
          <label>
            I Want:
            <select
              value={desiredOutput}
              onChange={(e) => setDesiredOutput(e.target.value)}
            >
              <option value="A detailed answer">A detailed answer</option>
            </select>
          </label>
        </div>

        <div className="form-group">
          <label>
            Tone:
            <select
              value={selectedTone}
              onChange={(e) => setSelectedTone(e.target.value)}
            >
              <option value="Professional">Professional</option>
              <option value="Friendly">Friendly</option>
              <option value="Academic">Academic</option>
              <option value="Helpful">Helpful</option>
              <option value="Direct">Direct</option>
            </select>
          </label>
        </div>

        <div className="form-group">
          <label>
            Output in:
            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
            >
              <option value="English">English</option>
              {/* Add more language options as needed */}
            </select>
          </label>
        </div>
      </div>

      <button onClick={handleFormSubmit}>Execute</button>
    </div>
  );
};

export default Chat;
