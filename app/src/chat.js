// Chat.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Chat = () => {
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Assume the user is initially logged in

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/profile', { withCredentials: true });

        if (response.data.message === 'Login required') {
          setIsLoggedIn(false);
        } else {
          setIsLoggedIn(true);
          // Fetch chat history if needed
          // For simplicity, assuming an empty array initially
          setChatHistory([]);
        }
      } catch (error) {
        console.error('Error checking login status:', error);
      }
    };

    checkLoginStatus();
  }, []);

  const handleSendMessage = async () => {
    try {
      // Add logic to send a chat message if needed
      // For simplicity, just updating the chat history state
      setChatHistory((prevHistory) => [...prevHistory, chatMessage]);
      setChatMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  return (
    <div>
      <h2>Chat</h2>
      {isLoggedIn ? (
        <div>
          {/* Display chat history */}
          {chatHistory.map((message, index) => (
            <div key={index}>{message}</div>
          ))}
          <textarea rows="3" value={chatMessage} onChange={(e) => setChatMessage(e.target.value)} />
          <button type="button" onClick={handleSendMessage}>
            Send Message
          </button>
        </div>
      ) : (
        <div>
          <p>Please log in to access the chat.</p>
          {/* You can add a login link or redirect to the login page */}
        </div>
      )}
    </div>
  );
};

export default Chat;
