import { Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getProducts, getProductsCount } from "../../functions/product";
import LoadingCard from "../cards/LoadingCard";
import ProductCard from "../cards/ProductCard";

function NewArrivals() {
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [productsCount, setProductsCount] = useState(0);
	const [page, setPage] = useState(1);

	const loadingAllProducts = () => {
		setLoading(true);
		getProducts("createdAt", "desc", page)
			.then((res) => {
				setProducts(res.data);
				setLoading(false);
			})
			.catch((error) => {
				setLoading(false);
				toast.error(error.message);
			});
	};
	useEffect(() => {
		loadingAllProducts();
	}, [page]);

	useEffect(() => {
		getProductsCount()
			.then((res) => setProductsCount(res.data))
			.catch((error) => console.log(error));
	}, []);

	return (
		<>
			<h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
				New Arrivals
			</h4>
			<div className="container">
				{loading ? (
					<LoadingCard count={3} />
				) : (
					<div className="row">
						{products.map((product) => (
							<div className="col-md-4" key={product._id}>
								<ProductCard product={product} />
							</div>
						))}
					</div>
				)}

				<div className="row">
					<nav className="col-md-4 offset-md-4 text-center pt-5 p-3 ">
						<Pagination
							current={page}
							total={(productsCount / 3) * 10}
							onChange={(value) => setPage(value)}
						/>
					</nav>
				</div>
			</div>
		</>
	);
}

export default NewArrivals;
