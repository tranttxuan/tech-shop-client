import React from "react";
import BestSellers from "../components/home/BestSellers";
import CategoryList from "../components/home/CategoryList";
import NewArrivals from "../components/home/NewArrivals";
import SubCategoryList from "../components/home/SubCategoryList";

const Home = () => {
    return (
        <>
            <NewArrivals />
            <br />
            <br />
            <BestSellers />
            <br />
            <br />
            <CategoryList />
            <br />
            <br />
            <SubCategoryList />
        </>
    );
};

export default Home;
