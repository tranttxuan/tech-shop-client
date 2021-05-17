import { DollarOutlined, LoadingOutlined } from '@ant-design/icons';
import { Menu, Slider } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeSearchValue } from '../actions/searchActions';
import ProductCard from '../components/cards/ProductCard';
import { fetchProductByFilter, getProductsByCount } from '../functions/product';

const { SubMenu } = Menu;

function Shop() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState();
    const dispatch = useDispatch();
    const search = useSelector(state => state.search);
    const { text } = search;
    const [price, setPrice] = useState([0, 4000]);
    const [startSearching, setStartSearching] = useState(false);

    const handleSlider = (value) => {
        dispatch(removeSearchValue());
        setPrice(value);
        setTimeout(() => {
            setStartSearching(!startSearching);
        }, 300)
    }
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

    //loading products based on price range
    useEffect(() => {
            fetchProducts({ price });
    }, [price, startSearching]);

    return (
        <div className="container-fluid">
            <div className='row'>
                <div className='col-md-3 pt-2'>
                    <h4>Search/Filters</h4>
                    <Menu defaultOpenKeys={["1", "2"]} mode='inline'>
                        <SubMenu key='1' title={<span className='h6'><DollarOutlined />Price</span>}>
                            <div>
                                <Slider
                                    range
                                    tipFormatter={price => `$${price}`}
                                    className='ml-4 mr-4'
                                    value={price}
                                    onChange={handleSlider}
                                    disabled={false}
                                    max='4999'
                                />
                            </div>
                        </SubMenu>

                    </Menu>
                </div>
                <div className='col-md-9 pt-2'>
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
