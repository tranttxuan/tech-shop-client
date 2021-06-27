import React from "react";
import Banner from "../components/home/Banner";
import BestSellers from "../components/home/BestSellers";
import CategoryList from "../components/home/CategoryList";
import Footer from "../components/home/Footer";
import NewArrivals from "../components/home/NewArrivals";
import SubCategoryList from "../components/home/SubCategoryList";
const Home = () => {
    return (
        <>
            <Banner />
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
            <br />
            <br />
            <Footer />
        </>
    );
};

export default Home;
