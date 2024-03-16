import React, { useState, useEffect } from "react";
import { useTimer } from "use-timer";
import axios from "axios";
import "./pomo.css";

import Red from "./Red";
import Green from "./Green";

import { motion } from "framer-motion";

import { Row, Col } from "reactstrap";

const MainPomodoro = () => {
  const [color, setColor] = useState("green");
  const [customTimer, setCustomTimer] = useState(100); // Default timer duration

  const { time, start, pause, reset, status } = useTimer({
    initialTime: customTimer,
    timerType: "DECREMENTAL",
    autostart: false, // Don't auto-start the timer
  });

  useEffect(() => {
    // Update the timer duration when customTimer changes
    reset({ time: customTimer });
  }, [customTimer]);

  const handleStartClick = () => {
    setColor("red"); // Set the color to red when the button is clicked
    start(); // Start the timer

    axios
      .post("http://localhost:8000/pomodoro/1", {})
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    setTimeout(() => {
      axios
        .post("http://localhost:8000/pomodoro/0", {})
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }, customTimer * 1000); // Convert customTimer to milliseconds
  };

  const handleCustomTimerChange = (event) => {
    const newCustomTimer = parseInt(event.target.value, 10);
    setCustomTimer(newCustomTimer);
    reset({ time: newCustomTimer }); // Reset the timer with the new custom time
  };

  return (
    <div
      className={`pomo ${color}`}
      style={{ minHeight: "100vh", paddingTop: "80px" }}
    >
      <Row>
        <Col lg="7">
          {color === "red" && <Red />}
          {color === "green" && <Green />}
        </Col>

        <Col lg="5" className="my-flex-props flex-col">
          <motion.button
            whileTap={{ scale: 1.2 }}
            className="pomo-btn"
            onClick={handleStartClick}
          >
            START
          </motion.button>

          <motion.button
            whileTap={{ scale: 1.2 }}
            className="pomo-btn-stop"
            onClick={() => {
              axios
                .post("http://localhost:8000/pomodoro/0", {})
                .then((response) => {
                  console.log(response);
                  setTimeout(100);
                })
                .catch((error) => {
                  console.error("Error:", error);
                });
            }}
          >
            Stop
          </motion.button>
          <p style={{ fontSize: "2rem" }}>
            Time Remaining:{" "}
            <span style={{ fontSize: "3rem", fontWeight: "500" }}>
              {customTimer >= 0 ? time : 0}{" "}
            </span>
          </p>

          <div>
            <label htmlFor="customTimer">Custom Timer (seconds): </label>
            <input
              type="number"
              id="customTimer"
              name="customTimer"
              value={customTimer}
              onChange={handleCustomTimerChange}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default MainPomodoro;
