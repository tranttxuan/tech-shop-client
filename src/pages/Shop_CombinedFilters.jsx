import { BgColorsOutlined, BranchesOutlined, DollarOutlined, DownSquareOutlined, LoadingOutlined, ShoppingOutlined, StarOutlined, TagOutlined } from '@ant-design/icons'
import { Button, Checkbox, Menu, Radio, Slider } from 'antd'
import SubMenu from 'antd/lib/menu/SubMenu'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ProductCard from '../components/cards/ProductCard'
import Star from '../components/forms/Star'
import { PRICE_RANGE } from '../constants'
import { getCategories } from '../functions/category'
import { fetchProductByFilter } from '../functions/product'
import { getSubs } from '../functions/sub'
import { removeSearchValue } from '../actions/searchActions';

function Shop_CombinedFilters() {
    const [queries, setQueries] = useState({});
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState();
    const [price, setPrice] = useState(PRICE_RANGE);
    const [categoryIds, setCategoryIds] = useState([]);
    const [categoryNames, setCategoryNames] = useState([]);
    const [categories, setCategories] = useState([]);
    const [stars, setStars] = useState(0);
    const [sub, setSub] = useState("");
    const [subs, setSubs] = useState([]);
    const [brands, setBrands] = useState(['Apple', 'Samsung', 'Microsoft', 'Lenovo', 'ASUS', 'HP']);
    const [brand, setBrand] = useState('');
    const [colors, setColors] = useState(['Black', 'Red', 'Blue', 'White', 'Brown', 'Silver']);
    const [color, setColor] = useState('');
    const [shipping, setShipping] = useState('')

    const dispatch = useDispatch();
    const search = useSelector(state => state.search);
    const { text } = search;
    
    // loading all category and subs
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

    useEffect(() => {
        loadCategories();
        loadSubs();
        return () => { 
            setCategories([]);
            setSubs([])
         }

    }, [loadCategories, loadSubs]);

    //function for loading products based on queries
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

    //****************** handle filter by price *******************
    const handleSlider = (price) => {
        setPrice(price);
        setTimeout(() => {
            setQueries({ ...(queries && queries), price });
        }, 500)
    }

    //****************** handle filter by input search *******************
    useEffect(() => {
        const delayed = setTimeout(() => {
            setQueries({ ...(queries && queries), text });
        }, 300);
        return () => clearTimeout(delayed);
    }, [text, queries]);

    //****************** handle filter by category *******************
    //handle check for categories
    const handleCheckCategory = (e) => {
        let checkedCategories = e;
        //use categoryId to find category name
        let categoryName = checkedCategories.map(checkedId => categories.filter(cat => cat._id === checkedId)[0].name);
        setCategoryNames(categoryName);
        setCategoryIds(checkedCategories);
        setQueries({ ...(queries && queries), category: checkedCategories });
    };

    // show categories in a list of checkbox 
    const showCategories = () => (
        <Checkbox.Group onChange={handleCheckCategory} value={categoryIds}>
            {categories.map((category) => (
                <div key={category._id} >
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

    //****************** handle filter by star *******************
    const handleStarClick = (stars) => {
        setStars(stars);
        setQueries({ ...(queries && queries), stars });
    }
    //  show star rating
    const showStar = () =>
        [...Array(5).keys()].reverse().map((star, i) =>
            <div className="pr-4 pl-4 pb-2" key={`star-${i}`}>
                <Star starClick={handleStarClick} numberOfStars={star + 1} />
            </div>
        );

    //****************** handle filter by Subcategory *******************
    const handleSub = (sub) => {
        const subName = subs.filter(s => s._id === sub)[0].name
        setSub(subName);
        setQueries({ ...(queries && queries), sub });
    }
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
    //****************** handle filter by Brand *******************
    const handleBrand = (e) => {
        setBrand(e.target.value);
        setQueries({ ...(queries && queries), brand: e.target.value });
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

    //****************** handle filter by Color *******************
    const handleColor = (e) => {
        setColor(e.target.value);
        setQueries({ ...(queries && queries), color: e.target.value });
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
        
    //****************** handle filter by Shipping *******************
    const handleShipping = (e) => {
        setShipping(e.target.value);
        setQueries({ ...(queries && queries), shipping: e.target.value });
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

    //loading products
    useEffect(() => {
        setTimeout(() => {
            fetchProducts(queries);
        }, 1000)
    }, [queries]);

    const handleRemoveFilter = () => {
        setPrice(PRICE_RANGE);
        setCategoryIds([]);
        setCategoryNames([]);
        setStars(0);
        setSub('');
        setBrand('');
        setColor('');
        setShipping('');
        dispatch(removeSearchValue());
        setQueries({});
    }

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
                    <div className="pb-2">
                        <h4 className='text-danger'>Filter Commands:</h4>

                        <div className="d-inline-flex align-items-center">
                            <p className='m-0'>
                                {
                                    price.length !== 0 &&
                                    <>Min price : <span className='text-info'>{price[0]}</span> - Max price : <span className='text-info'>{price[1]}</span></>
                                }
                                {
                                    text && <> - Text search : <span className='text-info'>{text}</span></>
                                }
                                {
                                    categoryNames.length !== 0 &&
                                    <> - Categories:
                                {categoryNames.map(cat => <span className='text-info'> {`${cat}, `}</span>)}
                                    </>
                                }
                                {
                                    stars !== 0 && <> - Average Rating : <span className='text-info'>{stars}</span></>
                                }
                                {
                                    sub && <> - Sub : <span className='text-info'>{sub}</span></>
                                }
                                {
                                    brand && <> - Brand : <span className='text-info'>{brand}</span></>
                                }
                                {
                                    color && <> - Color : <span className='text-info'>{color}</span></>
                                }
                                {
                                    shipping && <> - Shipping : <span className='text-info'>{shipping}</span></>
                                }
                                {' '}
                                <Button onClick={handleRemoveFilter} type="dashed">Remove filter</Button>
                            </p>
                        </div>
                    </div>
                    {loading
                        ? <h4><LoadingOutlined className='text-danger' />Loading ... </h4>
                        : <h4 className='text-danger'>{products && products.length} Products</h4>}

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

export default Shop_CombinedFilters
