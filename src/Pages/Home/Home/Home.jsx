import React from "react";
import HeroSlider from "../HomeComponents/HeroSlider";
import FeaturedLifeLessons from "../HomeComponents/FeaturedLifeLessons";
import LearningFromLife from "../HomeComponents/LearningFromLife";

const Home = () => {
  return (
    <div>
      <HeroSlider></HeroSlider>
      {/* <FeaturedLifeLessons></FeaturedLifeLessons> */}
      <LearningFromLife></LearningFromLife>
    </div>
  );
};

export default Home;
