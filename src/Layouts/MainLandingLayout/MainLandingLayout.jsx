import React from "react";
import { Outlet } from "react-router";
import Navbar from "../../Components/Navbar/Navbar";
import Footer from "../../Components/Footer/Footer";
const MainLandingLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
      <div className="container mx-auto min-h-screen">
        <Outlet></Outlet>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default MainLandingLayout;
