import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getProducts } from "../../functions/product";
import LoadingCard from "../cards/LoadingCard";
import ProductCard from "../cards/ProductCard";

function NewArrivals() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadingAllProducts = () => {
    setLoading(true);
    getProducts("createdAt", "desc", 3)
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
  }, []);
  return (
    <div>
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
      </div>
    </div>
  );
}

export default NewArrivals;
