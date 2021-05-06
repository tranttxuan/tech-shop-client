import { LoadingOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import FileUpload from "../../../components/forms/FileUpload";
import ProductCreateForm from "../../../components/forms/ProductCreateForm";
import AdminNav from "../../../components/nav/AdminNav";
import { getCategories, getSubsByCategory } from "../../../functions/category";
import { createProduct } from "../../../functions/product";

const initialState = {
  title: "Macbook Pro",
  description: "one of best Apple products",
  price: 4500,
  category: "",
  subs: [],
  shipping: "Yes",
  quantity: 50,
  images: [],
  colors: ["Black", "Red", "Blue", "White", "Brown", "Silver"],
  brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS", "HP"],
  color: "Silver",
  brand: "Apple",
  categories: [],
};

const CategoryCreate = () => {
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [showSub, setShowSub] = useState(false);

  const loadingCategories = () => {
    getCategories()
      .then((list) => setValues({ ...values, categories: list.data }))
      .catch((error) => toast.error(error.response.data.message));
  };

  useEffect(() => {
    loadingCategories();
  }, []);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setValues({ ...values, [name]: value });
  };

  const handleCategoryChange = (e) => {
    e.preventDefault();
    setValues({ ...values, subs: [], category: e.target.value });
    // fetch subs from backend
    getSubsByCategory(e.target.value)
      .then((res) => setSubOptions(res.data))
      .catch((error) => toast.error(error.response.data.message));
    setShowSub(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createProduct(values, user.token)
      .then((res) => {
        window.alert(`${res.data.title} is created`);
        window.location.reload();
      })
      .catch((error) => {
        // console.log(error.response.data.message)
        toast.error(error.response.data.message);
      });
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col-md-10">
          {loading ? (
            <h4 className="text-danger">
              {" "}
              <LoadingOutlined />
              Loading ...{" "}
            </h4>
          ) : (
            <h4>Create Product</h4>
          )}

          <div className="p-3">
            <FileUpload values={values} setValues={setValues} setLoading={setLoading}/>
          </div>

          <ProductCreateForm
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            handleCategoryChange={handleCategoryChange}
            subOptions={subOptions}
            showSub={showSub}
            values={values}
            setValues={setValues}
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryCreate;
