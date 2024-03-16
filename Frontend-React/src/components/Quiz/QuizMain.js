import React, { useState, useEffect } from "react";
import Questions from "./Questions";
import Like from "./signs/like.png";
import Dislike from "./signs/dislike.png";
import Palm from "./signs/palm.png";
import Fist from "./signs/fist.png";
import { Row, Col, Container } from "reactstrap";

function Quiz() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [receivedValue, setReceivedValue] = useState(null);

  useEffect(() => {
    // When receivedValue changes, check if the answer was correct
    if (receivedValue !== null) {
      const currentQuestion = Questions[currentQuestionIndex];
      if (currentQuestion.correct === receivedValue) {
        setTotalCorrect(totalCorrect + 1);
        console.log(totalCorrect);
      }

      // Move to the next question if not all questions are finished
      if (currentQuestionIndex < Questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }

      // Clear the receivedValue for the next question
      setReceivedValue(null);
    }
  }, [receivedValue, currentQuestionIndex, totalCorrect]);

  useEffect(() => {
    // Make an API request when the current question changes
    const fetchAnswer = async () => {
      const currentQuestion = Questions[currentQuestionIndex];
      const response = await fetch("http://localhost:8000/quizzer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        // body: JSON.stringify({
        //   questionId: currentQuestion.id,
        //   // Send data needed for hand gesture tracking
        // }),
      });

      if (response.ok) {
        const data = await response.json();
        setReceivedValue(data.data); // Assuming the API response provides the value 1-4
      }
    };

    fetchAnswer();
  }, [currentQuestionIndex]);

  const currentQuestion = Questions[currentQuestionIndex];

  return (
    <div style={{ backgroundColor: "white", minHeight: "100vh" }}>
      {currentQuestionIndex < Questions.length ? (
        <div>
          <h2 className="question">Question {currentQuestion.id}</h2>

          <div className="ques-div">
            <p style={{ textAlign: "center", fontSize: "3rem" }}>
              {currentQuestion.question}
            </p>
          </div>

          <Container style={{ marginLeft: "150px", marginTop: "70px" }}>
            <Row>
              <Col lg="6" style={{ fontSize: "2rem" }}>
                <img style={{ height: "200px" }} src={Palm} alt=".." />{" "}
                {currentQuestion.options[0]}
              </Col>

              <Col lg="6" style={{ fontSize: "2rem" }}>
                <img style={{ height: "200px" }} src={Fist} alt=".." />{" "}
                {currentQuestion.options[1]}
              </Col>
            </Row>

            <Row>
              <Col lg="6" style={{ fontSize: "2rem" }}>
                <img style={{ height: "200px" }} src={Like} alt=".." />
                {currentQuestion.options[2]}
              </Col>
              <Col lg="6" style={{ fontSize: "2rem" }}>
                <img style={{ height: "200px" }} src={Dislike} alt=".." />{" "}
                {currentQuestion.options[3]}
              </Col>
            </Row>
          </Container>
        </div>
      ) : (
        <div>
          <h2>Quiz Complete</h2>
          <p style={{fontSize: "2rem"}}>Total Correct: {totalCorrect}</p>
        </div>
      )}

      <p style={{fontSize: "2rem"}}>{totalCorrect} </p>
    </div>
  );
}

export default Quiz;
