import React from "react";

const Spinner = ({ size = "loading-xl", color = "text-primary" }) => {
  return (
    <div className="flex justify-center items-center min-h-screen w-full">
      <span className={`loading ${size} ${color}`}></span>
    </div>
  );
};

export default Spinner;
