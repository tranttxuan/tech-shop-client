import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
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
		<div className="container">
<div>

</div>
<div>
	
</div>
		</div>
	);
}

export default Product;
