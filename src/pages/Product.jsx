import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductCard from "../components/cards/ProductCard";
import SingleProduct from "../components/cards/SingleProduct";
import { getOneProduct, getRelatedProducts, productStar } from "../functions/product";

function Product({ match }) {
    const [product, setProduct] = useState({});
    const [relatedProducts, setRelatedProducts] = useState({});
    const [star, setStar] = useState(0);
    const { slug } = match.params;
    const user = useSelector(state => state.user);

    const loadSingleProduct = useCallback(() => {
        getOneProduct(slug)
            .then((res) => {
                setProduct(res.data);
                getRelatedProducts(res.data._id)
                    .then(relatedProd => setRelatedProducts(relatedProd.data))
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
    },[slug]);

    const onStarClick = (newRating, name) => {
        setStar(newRating);
        productStar(name, newRating, user.token)
            .then((res) => loadSingleProduct())
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        loadSingleProduct();
    }, [loadSingleProduct]);

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
                {product && <SingleProduct product={product} onStarClick={onStarClick} star={star} />}
            </div>
            <div className="row p-5">
                <div className='col text-center pt-5'>
                    <h1>Related products</h1>
                </div>
            </div>
            {relatedProducts.length
                ? <div className="row p-5">
                    {relatedProducts.map(product =>
                        <div className="col-md-4" key={product._id}>
                            <ProductCard product={product} />
                        </div>)}
                </div>
                : <div className="p-0 text-center"> No product found</div>
            }
        </div>
    );
}

export default Product;
