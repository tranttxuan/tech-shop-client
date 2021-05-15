import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SingleProduct from "../components/cards/SingleProduct";
import { getOneProduct, productStar } from "../functions/product";
import { showAverage } from "../functions/rating";

function Product({ match }) {
    const [product, setProduct] = useState({});
    const [star, setStar] = useState(0);
    const [averageRatings, setAverageRatings] = useState(0);
    const { slug } = match.params;
    const user = useSelector(state => state.user);

    const loadSingleProduct = () => {
        getOneProduct(slug)
            .then((res) => {
                setProduct(res.data);
                let averageRatings = showAverage(res.data);
                console.log({averageRatings});
                setAverageRatings(averageRatings);
            })
            .catch((err) => console.log(err));
    };

    const onStarClick = (newRating, name) => {
        setStar(newRating);
        productStar(name, newRating, user.token)
            .then((res) => loadSingleProduct())
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        loadSingleProduct();
    }, [slug]);

    useEffect(() => {
        if (product && product.ratings && user) {
            let existingRatingObject = product.ratings.find(
                (rating) => rating.postedBy.toString() === user._id.toString()
            );
            if (existingRatingObject) {
                setStar(existingRatingObject.star);
            };
        }
    }, [product, user]);

    return (
        <div className="container-fluid">
            <div className="row pt-4">
                {product && <SingleProduct product={product} onStarClick={onStarClick} star={star}/>}
            </div>
            <div className="row p-5">
                <div className='col text-center pt-5 pb-5'><h1>Related products</h1></div>
            </div>
        </div>
    );
}

export default Product;
