import React, { useState, useEffect, useCallback } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getOneProduct, updateProduct } from "../../../functions/product";
import { getCategories, getSubsByCategory } from "../../../functions/category";
import FileUpload from "../../../components/forms/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";
import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";

const initialState = {
    title: "",
    description: "",
    price: "",
    category: "",
    subs: [],
    shipping: "",
    quantity: "",
    images: [],
    colors: ["Black", "Brown", "Silver", "White", "Blue"],
    brands: ["Apple", "Samsung", "Microsoft", "Lenovo", "ASUS"],
    color: "",
    brand: "",
};

const ProductUpdate = ({ match, history }) => {
    // state
    const [values, setValues] = useState(initialState);
    const [categories, setCategories] = useState([]);
    const [subOptions, setSubOptions] = useState([]);
    const [arrayOfSubs, setArrayOfSubs] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [loading, setLoading] = useState(false);

    const { user } = useSelector((state) => ({ ...state }));
    // router
    const { slug } = match.params;

    const loadProduct = useCallback(() => {
        getOneProduct(slug)
            .then((product) => {
                setValues({ ...values, ...product.data });
                getSubsByCategory(product.data.category._id)
                    .then((res) => setSubOptions(res.data))
                    .catch((err) => console.log(err));
                let arr = [];
                product.data.subs.foreach((s) => {
                    arr.push(s._id);
                });
                setArrayOfSubs(arr);
            })
            .catch((err) => console.log(err));
    }, []);

    const loadCategories = useCallback(() => {
        getCategories()
            .then((c) => setCategories(c.data))
            .catch((err) => console.log(err))
    }, [])

    useEffect(() => {
        loadCategories();
        loadProduct();
    }, [loadCategories,loadProduct]);

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        values.subs = arrayOfSubs;
        values.category = selectedCategory ? selectedCategory : values.category;

        updateProduct(slug, values, user.token)
            .then((res) => {
                setLoading(false);
                toast.success(`"${res.data.title}" is updated`);
                history.push("/admin/products");
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                toast.error(err.response.data.err);
            });
    };

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleCategoryChange = (e) => {
        e.preventDefault();
        setValues({ ...values, subs: [] });

        setSelectedCategory(e.target.value);

        getSubsByCategory(e.target.value)
            .then((res) => setSubOptions(res.data))
            .catch((err) => console.log(err));

        // if user clicks back to the original category
        // show its sub categories in default
        if (values.category._id === e.target.value) {
            loadProduct();
        }
        // clear old sub category ids
        setArrayOfSubs([]);
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-2">
                    <AdminNav />
                </div>

                <div className="col-md-10">
                    {loading ? (
                        <LoadingOutlined className="text-danger h1" />
                    ) : (
                        <h4>Product update</h4>
                    )}

                    <div className="p-3">
                        <FileUpload
                            values={values}
                            setValues={setValues}
                            setLoading={setLoading}
                        />
                    </div>
                    <br />
                    <ProductUpdateForm
                        handleSubmit={handleSubmit}
                        handleChange={handleChange}
                        setValues={setValues}
                        values={values}
                        handleCategoryChange={handleCategoryChange}
                        categories={categories}
                        subOptions={subOptions}
                        arrayOfSubs={arrayOfSubs}
                        setArrayOfSubs={setArrayOfSubs}
                        selectedCategory={selectedCategory}
                    />
                    <hr />
                </div>
            </div>
        </div>
    );
};

export default ProductUpdate;
