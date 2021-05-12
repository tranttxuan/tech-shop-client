import React, { useEffect, useState } from "react";
import BestSellers from "../components/home/BestSellers";
import NewArrivals from "../components/home/NewArrivals";

const Home = () => {

  return (
    <>
      <NewArrivals />
      <br/>
      <BestSellers />
    </>
  );
};

export default Home;
