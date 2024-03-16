import { ParallaxProvider } from "react-scroll-parallax";
import { AdvancedBannerTop } from "./AdvancedBanner";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import RocketAnimation from "./RocketAnimation";
import { Link } from "react-router-dom";

import { Row, Col, Container, Button } from "reactstrap";

// import landingContent from "./content.js";
// import LandingCard from "./LandingCard";
import "./Home.css";
import { useNavigate } from "react-router-dom";

export default function ParallaxHome() {

  const navigate = useNavigate()
  const serviceData = [
    {
      icon: "ri-truck-line",
      title: "Free Shipping",
      subtitle:
        "Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.",
      bg: "#fdefe6",
    },
    {
      icon: "ri-refresh-line",
      title: "Easy Returns",
      subtitle:
        "Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.",
      bg: "#ceebe9",
    },
    {
      icon: "ri-secure-payment-line",
      title: "Secure Payment",
      subtitle:
        "Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.",
      bg: "#e2f2b2",
    },
    {
      icon: "ri-exchange-dollar-line",
      title: " Back Guarantee",
      subtitle:
        "Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.Lorem ipsum dolor sit amet.",
      bg: "#d6e5fb",
    }
  ];
  return (
    <>
    <ParallaxProvider>
      <AdvancedBannerTop />
     
      </ParallaxProvider>

      <div className="bg-texture">
      <TypeAnimation
          sequence={[
            // Same substring at the start will only be typed out once, initially
            "We help you LEARN.",
            1500, // wait 1s before replacing "Mice" with "Hamsters"
            "We help you GROW.",
            1500,
            "We help you COMPETE.",
            1500,
            "We help you PRACTICE.",
            1500,
          ]}
          wrapper="span"
          speed={40}
          style={{
            fontSize: "4em",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "100px",
            color: "white"
          }}
          repeat={Infinity}
        />
        <Container>
          <Row>
            {/* {serviceData.map((data, index) => (
              <Col lg="3" md="4" key={index}>
                <motion.div
                  className="service__item"
                  style={{ background: `${data.bg}` }}
                  whileHover={{ scale: 1.2 }}
                >
                  <span>
                    <i class={data.icon}></i>
                  </span>
                  <div>
                    <h3>{data.title}</h3>
                    <p>{data.subtitle}</p>
                  </div>
                </motion.div>
              </Col>
            ))} */}
          </Row>
          <div className="btn-landing">


          <Button className="cust-btn-prlx" color="primary" outline style={{fontSize: "3rem", backgroundColor: "white", position: "relative", zIndex: "2"}} onClick={()=>navigate("/login")}>
          Let's Start
        </Button>
          </div>

        </Container>

         <div style={{position: "relative", top: "-300px", zIndex: "0"}}>
        <RocketAnimation />
         </div>   
      </div>
      </>
    
  );
}
