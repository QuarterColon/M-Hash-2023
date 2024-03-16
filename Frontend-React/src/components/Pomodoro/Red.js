import React from "react";
import Lottie from "react-lottie";
import animationData from "./red.json"; // Replace with the path to your JSON animation file

const lottieOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData, // Your JSON animation data
};
function FlyingMan() {
  return (
    <div>
      <Lottie
        options={lottieOptions}
        height={600} // Set the height as needed
        width={600} // Set the width as needed
      />
    </div>
  );
}

function App() {
  return <FlyingMan />;
}

export default App;