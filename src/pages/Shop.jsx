import { BgColorsOutlined, BranchesOutlined, DollarOutlined, DownSquareOutlined, LoadingOutlined, ShoppingOutlined, StarOutlined, TagOutlined } from '@ant-design/icons';
import { Checkbox, Menu, Radio, Slider } from 'antd';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeSearchValue } from '../actions/searchActions';
import ProductCard from '../components/cards/ProductCard';
import Star from '../components/forms/Star';
import { getCategories } from '../functions/category';
import { fetchProductByFilter, getProductsByCount } from '../functions/product';
import { getSubs } from '../functions/sub';

const { SubMenu } = Menu;

function Shop() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState();
    const [price, setPrice] = useState([0, 4000]);
    const [startSearching, setStartSearching] = useState(false);
    const [categoryIds, setCategoryIds] = useState([]);
    const [categories, setCategories] = useState([]);
    const [stars, setStars] = useState(0);
    const [subs, setSubs] = useState([]);
    const [brands, setBrands] = useState(['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'ASUS', 'HP']);
    const [brand, setBrand] = useState('');
    const [colors, setColors] = useState(['Black', 'Red', 'Blue', 'White', 'Brown', 'Silver']);
    const [color, setColor] = useState('');
    const [shipping, setShipping] = useState('')
    const dispatch = useDispatch();
    const search = useSelector(state => state.search);
    const { text } = search;

    const handleSlider = (value) => {
        dispatch(removeSearchValue());
        setCategoryIds([]);
        setPrice(value);
        setStars('');
        setSubs([]);
        setBrand('');
        setColor('');
        setShipping('');
        setTimeout(() => {
            setStartSearching(!startSearching);
        }, 300)
    }

    const loadCategories = useCallback(() => {
        getCategories()
            .then((cat) => setCategories(cat.data))
            .catch(err => console.log(err))
    }, []);

    const loadSubs = useCallback(() => {
        getSubs()
            .then((sub) => setSubs(sub.data))
            .catch(err => console.log(err))
    }, []);

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
    }, []);

    useEffect(() => {
        loadAllProducts();
        loadCategories();
        loadSubs();
    }, [loadAllProducts, loadCategories, loadSubs]);

    const fetchProducts = (arg) => {
        fetchProductByFilter(arg)
            .then(products => {
                setProducts(products.data);
                setLoading(false);
                console.log(products.data)
            })
            .catch(err => {
                setLoading(false);
                console.log(err);
            });
    };

    // loading products on user search input 
    useEffect(() => {
        const delayed = setTimeout(() => {
            fetchProducts({ query: text });
        }, 300);
        return () => clearTimeout(delayed);
    }, [text]);

    //loading products based on price range
    useEffect(() => {
        fetchProducts({ price });
    }, [startSearching]);

    //handle check for categories
    const handleCheck = (e) => {
        dispatch(removeSearchValue());
        setPrice([0, 0]);
        setStars('');
        setSubs([]);
        setBrand('');
        setColor('');
        setShipping('');
        let checkedCategory = e;
        setCategoryIds(checkedCategory);
        fetchProducts({ category: checkedCategory })
    };

    // loading products based on category 
    // show categories in a list of checkbox 
    const showCategories = () => (
        <Checkbox.Group onChange={handleCheck} value={categoryIds}>
            {categories.map((category) => (
                <div key={category._id}>
                    <Checkbox
                        className="pb-2 pl-4 pr-4"
                        value={category._id}
                        name='category'
                    >
                        {category.name}
                    </Checkbox>
                    <br />
                </div>
            ))}
        </Checkbox.Group>
    )

    //loading products by star rating
    const handleStarClick = (starClick) => {
        dispatch(removeSearchValue());
        setCategoryIds([]);
        setPrice([0, 0]);
        setStars(starClick);
        setSubs([]);
        setColor('');
        setBrand('');
        setShipping('');
        fetchProducts({ stars: starClick })
    }

    const showStar = () =>
        [...Array(5).keys()].reverse().map((star, i) =>
            <div className="pr-4 pl-4 pb-2" key={`star-${i}`}>
                <Star starClick={handleStarClick} numberOfStars={star + 1} />
            </div>
        );

    //loading products by sub category
    const handleSub = (sub) => {
        dispatch(removeSearchValue());
        setCategoryIds([]);
        setPrice([0, 0]);
        setStars("");
        setBrand('');
        setColor('');
        setBrand('');
        setShipping('');
        fetchProducts({ sub })
    };

    const showSubCategories = () =>
        <div className="row ml-4 mr-4">
            {subs.map((sub) =>
                <div
                    key={sub._id}
                    onClick={() => handleSub(sub._id)}
                    className="p-1 m-1 badge badge-secondary"
                    style={{ cursor: 'pointer' }}
                >
                    {sub.name}
                </div>
            )}
        </div>

    //loading products by brand
    const handleBrand = (e) => {
        dispatch(removeSearchValue());
        setCategoryIds([]);
        setPrice([0, 0]);
        setStars("");
        setSubs([]);
        setColor('');
        setShipping('');
        setBrand(e.target.value);
        fetchProducts({ brand: e.target.value })
    }
    const showBrand = () =>
        <Radio.Group onChange={handleBrand} value={brand}>
            {brands.map((b) => (
                <div key={b}>
                    <Radio
                        className="pb-2 pl-4"
                        value={b}
                        name='brand'
                    >
                        {b}
                    </Radio>
                    <br />
                </div>
            ))}
        </Radio.Group>

    //loading products by color
    const handleColor = (e) => {
        dispatch(removeSearchValue());
        setCategoryIds([]);
        setPrice([0, 0]);
        setStars("");
        setSubs([]);
        setBrand('');
        setShipping('');
        setColor(e.target.value);
        fetchProducts({ color: e.target.value })
    }
    const showColor = () =>
        <Radio.Group onChange={handleColor} value={color}>
            {colors.map((c) => (
                <div key={c}>
                    <Radio
                        className="pb-2 pl-4"
                        value={c}
                        name='color'
                    >
                        {c}
                    </Radio>
                    <br />
                </div>
            ))}
        </Radio.Group>

    //loading products by shipping
    const handleShipping = (e) => {
        dispatch(removeSearchValue());
        setCategoryIds([]);
        setPrice([0, 0]);
        setStars("");
        setSubs([]);
        setBrand('');
        setColor('');
        setShipping(e.target.value);
        fetchProducts({ shipping: e.target.value })
    }

    const showShipping = () =>
        <Radio.Group onChange={handleShipping} value={shipping}>
            {['Yes', 'No'].map((isShipping) => (
                <div key={isShipping}>
                    <Radio
                        className="pb-2 pl-4"
                        value={isShipping}
                        name='shipping'
                    >
                        {isShipping}
                    </Radio>
                    <br />
                </div>
            ))}
        </Radio.Group>

    return (
        <div className="container-fluid">
            <div className='row'>
                <div className='col-md-3 pt-2'>
                    <h4>Search/Filters</h4>
                    <Menu defaultOpenKeys={["1", "2", "3", "4"]} mode='inline'>
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
                                    marks={{ 0: '$0', 5000: '$5000' }}
                                    autoFocus
                                />
                            </div>
                        </SubMenu>

                        <SubMenu key='2' title={<span className='h6'><DownSquareOutlined />Category</span>}>
                            <div>
                                {showCategories()}
                            </div>
                        </SubMenu>

                        <SubMenu key='3' title={<span className='h6'><StarOutlined />Ratings</span>}>
                            <div>
                                {showStar()}
                            </div>
                        </SubMenu>

                        <SubMenu key='4' title={<span className='h6'><TagOutlined />Sub Categories</span>}>
                            <div>
                                {showSubCategories()}
                            </div>
                        </SubMenu>

                        <SubMenu key='5' title={<span className='h6'><BranchesOutlined />Brand</span>}>
                            <div>
                                {showBrand()}
                            </div>
                        </SubMenu>

                        <SubMenu key='6' title={<span className='h6'><BgColorsOutlined />Color</span>}>
                            <div>
                                {showColor()}
                            </div>
                        </SubMenu>

                        <SubMenu key='7' title={<span className='h6'><ShoppingOutlined />Shipping</span>}>
                            <div>
                                {showShipping()}
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
