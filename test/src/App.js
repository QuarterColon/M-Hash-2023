import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';

const App = () => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState("");

  const capture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();

    try {
      await axios.post('/upload', { image: imageSrc });
      console.log('Image sent to server.');
      
      setImgSrc(imageSrc);
    } catch (error) {
      console.error('Error sending image to server:', error);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>Webcam Data to Server</h1>
      <div style={{ margin: 'auto' }}>
        <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
      </div>
      <div style={{ margin: 'auto' }}>
        <button
          style={{
            marginTop: '10px',
            fontSize: '20px',
            backgroundColor: '#423fff',
            cursor: 'pointer',
            borderRadius: "10px",
            color: "white",
            padding: "10px"
          }}
          onClick={capture}
        >
          Capture
        </button>
      </div>

      {
        imgSrc !== "" &&
        <div style={{ marginTop: '20px' }}>
          <h2>Captured Image</h2>
          <img src={imgSrc} alt="Captured" style={{ marginTop: '10px' }} />
        </div>
      }
    </div>
  );

};

export default App;
