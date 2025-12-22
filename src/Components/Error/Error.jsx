import React from "react";
import animationData from "../../assets/error.json";
import Lottie from "lottie-react";

const Error = () => {
  return (
    <div>
      <Lottie
        animationData={animationData}
        loop
        style={{ width: 300, height: 300 }}
      />{" "}
    </div>
  );
};

export default Error;
