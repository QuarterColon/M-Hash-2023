import React, { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import axios from "axios";
import { Row, Col, Container } from "reactstrap";
import {
  MDBDropdown,
  MDBDropdownMenu,
  MDBDropdownToggle,
  MDBDropdownItem,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";

import listeningImg from "../../assets/images/listen.png";
import idleImg from "../../assets/images/idle.png";

import "./chat.css";
import MicAnimation from "./MicAnimation";
import CatEar from './CatEar';

function SpeechInput() {
  const [currState, setCurrState] = useState("idle");
  const [currLang, setCurrLang] = useState('english')

  const [responseMessage, setResponseMessage] = useState("");
  const { transcript, resetTranscript } = useSpeechRecognition();

  const handleSubmit = () => {
    setCurrState("loading")
    // Send the recorded audio to the API
    axios
      .post("http://localhost:8000/aitutor/"+currLang, { text: transcript })
      .then((response) => {
        resetTranscript();
        // console.log(response);
        setCurrState("speaking");
        setResponseMessage(response.data.data);
      })
      .catch((error) => {
        console.error("Error:", error);
        setResponseMessage("Error occurred while fetching data.");
      });
  };

  const startListening = () => {
    SpeechRecognition.startListening();
  };

  return (
    <div
      className="my-flex-props white-body bg-chat"
      style={{ padding: "100px 0" }}
    >
      <Container>
        <Row>
          <Col lg="6">
            {currState === "idle" && <img src={listeningImg} alt=".." />}
            {currState === "loading" && <img src={listeningImg} alt=".." />}
            {currState === "speaking" && <img src={idleImg} alt=".." />}
          </Col>

          <Col lg="6" className="my-flex-props flex-col">
            <h1>
              Welcome to the{" "}
              <span style={{ color: "blue" }}>Interactive Chatbot</span>.
            </h1>
            <button onClick={startListening} className="btn-ask" style={{color: "black"}}>
              Ask me a question
            </button>
            <p>Spoken Text: {transcript}</p>

            {/* <button onClick={SpeechRecognition.stopListening}>
            Stop Speech Input
          </button> */}
          {
            currState === 'idle'? <button onClick={handleSubmit} className="btn-confirm" style={{color: "black"}}>
              Confirm
            </button>:
            <button className="btn-wait"> Wait....</button>
          }
            

            <MDBDropdown>
              <MDBDropdownToggle tag="a" className="btn btn-primary" onClick={()=> setCurrLang('english')}>
               {currLang}
              </MDBDropdownToggle>
              <MDBDropdownMenu>
                <MDBDropdownItem link onClick={()=> setCurrLang('hindi')}>Hindi</MDBDropdownItem>
                <MDBDropdownItem link onClick={()=> setCurrLang('french')}>French</MDBDropdownItem>
                <MDBDropdownItem link onClick={()=> setCurrLang('japanese')}>japanese</MDBDropdownItem>
              </MDBDropdownMenu>
            </MDBDropdown>

            {currState === "loading" && <p style={{fontSize: "2rem"}}>Please wait while your response is loading ...</p> }
            {currState === "idle" && <MicAnimation /> }

            {currState === "loading" && <div style={{position: "relative", top:"-120px"}}><CatEar /></div>}
            {currState === "speaking" &&  <p className="resp-p"> {responseMessage}</p>}
              
  

            <button className="btn-back">
              {" "}
              {"<"}{" "}
              <Link
                to="/home"
                style={{ color: "black", textDecoration: "none" }}
              >
                {" "}
                Back{" "}
              </Link>{" "}
            </button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default SpeechInput;
