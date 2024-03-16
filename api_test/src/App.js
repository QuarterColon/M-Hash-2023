import React, { useState } from 'react';
import axios from 'axios';

function TextInput() {
  const [inputText, setInputText] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSubmit = async() => {
    // Create a JSON object with the user's input
    
    const data = { text: inputText };
    

    

    // Make a POST request to the API endpoint
    fetch('http://localhost:8000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  

  return (
    <div>
      <input
        type="text"
        value={inputText}
        onChange={handleInputChange}
        placeholder="Enter your text"
      />
      <button onClick={handleSubmit}>Post to API</button>
      <p>You entered: {inputText}</p>
      <p>API Response: {responseMessage}</p>
    </div>
  );
}


export default TextInput;