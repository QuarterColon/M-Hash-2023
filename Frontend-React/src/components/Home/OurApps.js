import React from "react";

import { Container, Row, Col } from "reactstrap";
import { motion } from "framer-motion";
import {Link} from 'react-router-dom'

const OurApps = () => {
  const ourApps = [
    {
      id: 1,
      title: "Voice Enabled ChatBot.",
      desc: "Interactive chatbot to communicate via speech.",
      linkTo: "/chatme",
      imgUrl: "/images/bot.png",
      bg: "#186F65",
    },
    {
        id: 2,
        title: 'Memory Game',
        desc: 'Have a fun session playing a challenging memory game',
        linkTo: 'https://aditipy.github.io/Simon.github.io/',
        imgUrl: '/images/cube.png',
        bg: "#EFB960",


    }, 
    {
      id: 3,
      title: 'Pomodoro',
      desc: 'Have a relaxed and soothing study session using out pomodoro app.',
      linkTo: '/pomodoro',
      imgUrl: '/images/clock.png',
      bg: "#264E70"
    }
  ];

  const sApps = [
    {
      id: 1,
      title: "Essay Writing",
      desc: "Given a few mandatory words evaluate the essay and give feedback for it.",
      linkTo: "/grammar",
      imgUrl: "/images/exam.png",
      bg: "#ED7D31"
    },
    {
        id: 2,
        title: 'Scrambled Words',
        desc: 'Arrange a set of jumbled letters to form a proper word.',
        linkTo: '/scramble',
        imgUrl: '/images/quiz.png',
        bg: "#3287D4",
    }, 
    {
      id: 3,
      title: 'Quiz',
      desc: '(In Progress)',
      linkTo: '#',
      imgUrl: '/images/multiple.png',
      bg: "#C70039"
    }
  ];
  return (
    <div style={{ padding: "50px 0" }}>
      <Container>
        <Row style={{padding: "50px 0"}}>
          {ourApps.map((data, index) => (
            <Col lg="4" md="2" key={index}>
              <motion.div
                className="service__item"
                style={{ background: `${data.bg}`, minHeight: "200px", color: "white" }}
                whileHover={{ scale: 1.2 }}
              >
                <img style={{height: "120px"}} src={data.imgUrl} alt="" />
                <div>
                  <h3>{data.title}</h3>
                  <p style={{color: "white"}}>{data.desc}</p>
                  <Link style={{color: "gray"}} to={data.linkTo}> <span style={{color: "gray"}}>Visit App{' >'}</span> </Link>
                </div>
              </motion.div>
            </Col>
          ))}
        </Row>
        <hr style={{ marginTop: "50px", width: "80%", margin: "0 auto" }} />

        <div className="my-flex-props">
          <h3 style={{fontFamily: "cursive", fontSize: "2.4rem", position: "relative", top: "20px"}}>Special Care Section</h3>
            </div>
            <Row style={{padding: "50px 0"}}>
          {sApps.map((data, index) => (
            <Col lg="4" md="2" key={index} style={{color: "white"}}>
              <motion.div
                className="service__item"
                style={{ background: `${data.bg}`, minHeight: "200px" }}
                whileHover={{ scale: 1.2 }}
              >
                <img style={{height: "120px"}} src={data.imgUrl} alt="" />
                <div >
                  <h3 style={{color: "white"}}>{data.title}</h3>
                  <p style={{color: "white"}}>{data.desc}</p>
                  <Link style={{color: "gray"}} to={data.linkTo}> <span style={{color: "gray"}}>Visit App{' >'}</span> </Link>
                </div>
              </motion.div>
            </Col>
          ))}
        </Row>     
        
      </Container>
    </div>
  );
};

export default OurApps;
