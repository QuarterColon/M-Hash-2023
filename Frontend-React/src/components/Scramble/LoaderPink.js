import React from "react";
import Lottie from "react-lottie";
import animationData from "./loaderPink.json"; // Replace with the path to your JSON animation file

const lottieOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData, // Your JSON animation data
};
function LoaderPink() {
  return (
    <div>
      <Lottie
        options={lottieOptions}
        height={100} // Set the height as needed
        width={100} // Set the width as needed
      />
    </div>
  );
}

function App() {
  return <LoaderPink />;
}

export default App;