// render Buttons first then Home Page. Using timer. can use db later

import React, { useState, useEffect } from "react";

import MainHome from "../components/Landing/MainHome";
import PsButtons from "../components/UI/PsButtons";

const Home = () => {
  const [showBComponent, setShowBComponent] = useState(false);

  useEffect(() => {
    // Set showBComponent to true after 3 seconds
    const timer = setTimeout(() => {
      setShowBComponent(true);
    }, 3000);

    // Clear the timer if the component unmounts or if the state changes before 3 seconds
    return () => clearTimeout(timer);
  }, []); 


  return (
    <div className="">
      {showBComponent ?  <MainHome /> : <PsButtons /> }
    </div>

  );
};

export default Home;
