import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import SingleProduct from "../components/cards/SingleProduct";
import { getOneProduct } from "../functions/product";

function Product({ match }) {
    const [product, setProduct] = useState();
    const { slug } = match.params;

    const loadSingleProduct = () => {
        getOneProduct(slug)
            .then((res) => setProduct(res.data))
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        loadSingleProduct();
    }, []);

    return (
        <div className="container-fluid">
            <div className="row pt-4">
                {product && <SingleProduct product={product} />}
            </div>
            <div className="row p-5">
                <div className='col text-center pt-5 pb-5'><h1>Related products</h1></div>
            </div>
        </div>
    );
}

export default Product;
