import { LoadingOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import AdminProductCard from "../../../components/cards/AdminProductCard";
import AdminNav from "../../../components/nav/AdminNav";
import { deleteProduct, getProductsByCount } from "../../../functions/product";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);

  const loadAllProduct = () => {
    setLoading(true);
    getProductsByCount(10)
      .then((res) => {
        setLoading(false);
        setProducts(res.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    loadAllProduct();
  }, []);

  const handleDeleteProduct = (slug) => {
    let answer = window.confirm(`Are you sure to delete this product ${slug}`);
    if (answer) {
      setLoading(true);
      deleteProduct(slug, user.token)
        .then((res) => {
          setLoading(false);
          toast.success(`${slug} is deleted`);
          loadAllProduct(res.data.title);
        })
        .catch((error) => {
          setLoading(false);
          toast.error(error.message);
        });
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>

        <div className="col">
          {loading ? (
            <h4 className="text-danger">
              <LoadingOutlined /> Loading...
            </h4>
          ) : (
            <h4>All Products</h4>
          )}
          <div className="row">
            {products.map((product) => (
              <div key={product._id} className="col-md-4 pb-3">
                <AdminProductCard
                  product={product}
                  handleDeleteProduct={handleDeleteProduct}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
