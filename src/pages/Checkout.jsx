import { LoadingOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import { removeUserCart } from '../actions/cartActions';
import { applyCouponAction } from '../actions/userActions';
import { applyCoupon, emptyUserCart, getUserCart, saveUserAddress } from '../functions/user';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Checkout({ history }) {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [address, setAddress] = useState('');
    const [savedAddress, setSavedAddress] = useState(false);
    const [coupon, setCoupon] = useState('');
    const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);
    const [discountError, setDiscountError] = useState('');

    const user = useSelector(state => state.user)
    const dispatch = useDispatch();

    const saveAddressToDB = () => {
        saveUserAddress(user.token, address)
            .then(response => {
                setSavedAddress(true);
                toast.success('Address saved')
            })
            .catch(err => {
                console.log(err);
                toast.error(err.message)
            })
    };

    const emptyCart = () => {
        dispatch(removeUserCart());
        emptyUserCart(user.token)
            .then(response => {
                setProducts([]);
                setTotal(0);
                setTotalAfterDiscount(0);
                setCoupon('');
                toast.success('Cart is empty. Continue shopping')
            })
            .catch(response => console.log(response))
    };

    useEffect(() => {
        setLoading(true);
        getUserCart(user.token)
            .then(cart => {
                setLoading(false);
                const { products, cartTotal } = cart.data;
                setProducts(products);
                setTotal(cartTotal);
            })
            .catch(err => {
                setLoading(false);
                console.log(err)
            })
    }, []);

    const applyDiscountCoupon = () => {
        applyCoupon(coupon.toUpperCase(), user.token)
            .then(response => {
                console.log(response.data);
                if (response.data) {
                    setTotalAfterDiscount(response.data.totalAfterDiscount);
                    dispatch(applyCouponAction(true));
                }
                if (response.data.err) {
                    setDiscountError(response.data.err);
                    dispatch(applyCouponAction(false))
                }
            })
            .catch(err => console.log(err));
    }

    const handleCouponInput = (e) => {
        setDiscountError('')
        setCoupon((e.target.value))
    }

    const showAddress = () => <div className='mb-5'>
        <ReactQuill
            theme="snow"
            value={address}
            onChange={setAddress} />
        <button
            className='btn btn-primary btn-raised mt-2'
            onClick={saveAddressToDB}
        >
            Save
                </button>
    </div>

    const showProductSummary = () =>
        products.map((prod) =>
            <div key={prod._id} className='row'>
                <p className='col-md-7'>{prod.product.title}{" "}</p>
                <p className='col-md-2'>({prod.color} x {prod.count}){" "}</p>
                <p className='col-md-1'>={" "}</p>
                <p className='col-md-1'>{prod.product.price * prod.count}</p>
            </div>
        )

    const showApplyCoupon = () => <>
        <input type="text"
            onChange={handleCouponInput}
            value={coupon}
            className='form-control'
        />
        <button onClick={applyDiscountCoupon}
            className='btn btn-primary btn-raised mt-2'
        >
            Apply
        </button>
    </>

    return (
        <div className='container-fluid'>
            { loading
                ? <h4 className='pt-2'><LoadingOutlined />Loading ...</h4>
                : <div className='row pt-2'>
                    <div className='col-md-6'>
                        <h4>Delivery Address</h4>
                        {showAddress()}
                        <h4>Got Coupon</h4>
                        {showApplyCoupon()}
                        {discountError && <p className='bg-danger p-2'>{discountError}</p>}
                    </div>
                    <div className='col-md-6'>
                        <h4 className='mb-2'>Order Summary</h4>
                        <p>Products: {products.length}</p>
                        {showProductSummary()}
                        <p>Cart Total: {total}</p>
                        {totalAfterDiscount > 0 && (
                            <p className='bg-success p-2'>
                                <strong>Discount Applied: Total Payable: </strong>${totalAfterDiscount}
                            </p>
                        )}
                        <div className='row'>
                            <div className='col-md-6'>
                                <button
                                    onClick={() => history.push('/payment')}
                                    disabled={!savedAddress || !products.length}
                                    className='btn btn-primary'>Place Order</button>
                            </div>
                            <div className='col-md-6'>
                                <button
                                    className='btn btn-primary'
                                    disabled={!products.length}
                                    onClick={emptyCart}>
                                    Empty Order
                            </button>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Checkout
