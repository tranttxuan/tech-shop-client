import { LoadingOutlined } from '@ant-design/icons';
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom'
import ProductCard from '../../components/cards/ProductCard';
import { getCategories, getCategory } from '../../functions/category'
import { getProducts } from '../../functions/product';

function CategoryPage() {
    let { slug } = useParams();
    const [category, setCategory] = useState({});
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setLoading(true)
        getCategory(slug)
            .then(cat => {
                setCategory(cat.data.category);
                setProducts(cat.data.products);
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                console.log(err)
            })

    }, []);

    return (
        <div className="container">
            {loading
                ? <h4 className="text-center p-3 mt-5 mb-5 display-4 "><LoadingOutlined />Loading ....</h4>
                : <h4 className="text-center p-3 mt-5 mb-5 display-4 ">{products.length} Products in "{category.name}" category</h4>
            }
            <div className="row">
                {products.map(prod => (
                    <div className="col-md-4" key={prod._id}>
                        <ProductCard product={prod} />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default CategoryPage;
