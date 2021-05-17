import { LoadingOutlined } from '@ant-design/icons';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProductCard from '../components/cards/ProductCard';
import { fetchProductByFilter, getProductsByCount } from '../functions/product';

function Shop() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState();
    const dispatch = useDispatch();
    const search = useSelector(state => state.search);
    const { text } = search;
    // loading all products 
    const loadAllProducts = useCallback(() => {
        setLoading(true);
        getProductsByCount(12)
            .then(products => {
                setProducts(products.data);
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                console.log(err);
            });
    }, [])

    useEffect(() => {
        loadAllProducts();
    }, [loadAllProducts]);

    // loading products on user search input 
    const fetchProducts = (arg) => {
        fetchProductByFilter(arg)
            .then(products => {
                console.log(products.data)
                setProducts(products.data);
                setLoading(false);
            })
            .catch(err => {
                setLoading(false);
                console.log(err);
            });
    };

    useEffect(() => {
        const delayed = setTimeout(() => {
            fetchProducts({ query: text });
        }, 300);
        return () => clearTimeout(delayed);
    }, [text]);

    return (
        <div className="container-fluid">
            <div className='row'>
                <div className='col-md-3'>
                    ok
                </div>
                <div className='col-md-9'>
                    {loading
                        ? <h4><LoadingOutlined className='text-danger' />Loading ... </h4>
                        : <h4 className='text-danger'>Products</h4>}

                    {products.length < 1 && <p>No product found</p>}
                    <div className="row pb-5">
                        {products.map(product =>
                            <div key={product._id} className='col-md-4 mt-3'>
                                <ProductCard product={product} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Shop
