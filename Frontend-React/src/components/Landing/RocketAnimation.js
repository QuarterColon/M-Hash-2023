import React from "react";
import Lottie from "react-lottie";
import animationData from "./rocket.json"; // Replace with the path to your JSON animation file

const lottieOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData, // Your JSON animation data
};
function Rocket() {
  return (
    <div>
      <Lottie
        options={lottieOptions}
        height={700} // Set the height as needed
        width={700} // Set the width as needed
      />
    </div>
  );
}

function App() {
  return <Rocket />;
}

export default App;