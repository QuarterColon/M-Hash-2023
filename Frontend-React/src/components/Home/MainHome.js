import { React, useContext, useEffect, useState } from "react";
import { Row, Col, Container, Button } from "reactstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./Home.css"; // Make sure to import your CSS file
import suberBoy from "../../assets/images/superboy.png";
import Trophy from "./trophy.png";

import clock from "../../assets/images/clock.png";
import OurApps from "./OurApps";

import TodoList from "./TodoList";
import Card from "./Card";
import { useAuthState } from "react-firebase-hooks/auth";
import { onAuthStateChanged } from "firebase/auth";
import { UserContext } from "../../UserContext";
import { auth, db, logout } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

const MainHome = () => {
  const [leaderBoard, setLeaderBoard] = useState([]);

  const days = [
    { id: 1, day: "M" },
    { id: 2, day: "T" },
    { id: 3, day: "W" },
    { id: 4, day: "T" },
    { id: 5, day: "F" },
    { id: 6, day: "S" },
    { id: 7, day: "S" },
  ];

  const currentDate = new Date();
  const currentDayOfWeek = currentDate.getDay();
  // const [currentUser, setCurrentUser] = useState();
  // const [userData, setUserData] = useState();
  const [user, loading, error] = useAuthState(auth);
  const { currentUser, userData } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const query = await getDocs(collection(db, "users"));
        const newLeaderBoard = query.docs.map((doc, index) => ({
          id: index + 1,
          name: doc.data().name,
          points: doc.data().coins,
        }));

        newLeaderBoard.sort((a, b) => b.points - a.points);

        setLeaderBoard(newLeaderBoard); // Update leaderBoard state
      } catch (e) {
        console.log(e);
      }
    };

    fetchAllUsers();
  }, []);

  return (
    <div className="bg-home">
      <div className="dummy-dash">
        <div style={{ display: "flex", flexDirection: "row-reverse" }}>
          <Link to="/pomodoro">
            {" "}
            <img
              className="img-clock"
              style={{ margin: "45px 120px 0 0" }}
              src={clock}
              alt=".."
            />{" "}
          </Link>
        </div>
      </div>

      <Container className="dash">
        <Row>
          <Col lg="5">
            <div className="flex-cards">
              <Card />
            </div>
          </Col>
          <Col lg="3" className="dash-item">
            <img className="img-dash" src={suberBoy} alt="avatar" />
          </Col>

          <Col lg="4" className="dash-item">
            <div className="dash-info right-dash-item">
              <h4>{userData?.name}</h4>
              <button
                onClick={() => {
                  
                  navigate("/login")
                }}
              >
                Log Out
              </button>
              {days.map((day) => (
                <span
                  style={{
                    marginRight: "10px",
                    color: day.id === currentDayOfWeek ? "red" : "black",
                    textDecoration:
                      day.id === currentDayOfWeek ? "Underline" : "None",
                  }}
                  key={day.id}
                >
                  {day.day}
                </span>
              ))}
            </div>
          </Col>
        </Row>
      </Container>

      <OurApps />

      <Container>
        <Row className="" style={{ marginTop: "50px" }}>
          <Col
            className="round-left my-flex-props flex-col"
            lg="6"
            style={{ backgroundColor: "#003566" }}
          >
            <h3 style={{ color: "white", padding: "20px 0" }}>
              Leaderboard Section
            </h3>
            <img src={Trophy} alt=".." />

            {leaderBoard.map((leader, index) => {
              return (
                <div className="leaderBoard" key={leader.id}>
                  <p>{index + 1}</p>
                  <h5>{leader.name}</h5>
                  <p>{leader.coins}</p>
                </div>
              );
            })}
          </Col>

          <Col
            className="my-flex-props round-right"
            lg="6"
            style={{ backgroundColor: "#001d3d" }}
          >
            <TodoList />
          </Col>
        </Row>
      </Container>
      
    </div>
  );
};

export default MainHome;
