import React from "react";
import BestSellers from "../components/home/BestSellers";
import NewArrivals from "../components/home/NewArrivals";

const Home = () => {
  return (
    <>
      <NewArrivals />
      <br />
      <br />
      <BestSellers />
    </>
  );
};

export default Home;
