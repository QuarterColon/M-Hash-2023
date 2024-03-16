import React from "react";
import Lottie from "react-lottie";
import animationData from "./mic.json"; // Replace with the path to your JSON animation file

const lottieOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData, // Your JSON animation data
};
function MicAnimation() {
  return (
    <div>
      <Lottie
        options={lottieOptions}
        height={200} // Set the height as needed
        width={200} // Set the width as needed
      />
    </div>
  );
}

function App() {
  return <MicAnimation />;
}

export default App;
