import { LoadingOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import { removeUserCart } from '../actions/cartActions';
import { emptyUserCart, getUserCart, saveUserAddress } from '../functions/user';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

function Checkout() {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [total, setTotal] = useState(0);
    const [address, setAddress] = useState('');
    const [savedAddress, setSavedAddress] = useState(false);

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

    return (loading
        ? <h4 className='pt-2'><LoadingOutlined />Loading ...</h4>
        : <div className='row pt-2'>
            <div className='col-md-6'>
                <h4>Delivery Address</h4>
                <ReactQuill
                    theme="snow"
                    value={address}
                    onChange={setAddress} />
                <button
                    className='btn btn-primary mt-2'
                    onClick={saveAddressToDB}
                >
                    Save
                </button>
                <h4>Got Coupon</h4>
            </div>
            <div className='col-md-6'>
                <h4 className='mb-2'>Order Summary</h4>
                <p>Products: {products.length}</p>
                {products.map((prod) => <div>
                    <div key={prod._id} className='row'>
                        <p className='col-md-7'>{prod.product.title}{" "}</p>
                        <p className='col-md-2'>({prod.color} x {prod.count}){" "}</p>
                        <p className='col-md-1'>={" "}</p>
                        <p className='col-md-1'>{prod.product.price * prod.count}</p>
                    </div>
                </div>)}
                <p>Cart Total: {total}</p>
                <div className='row'>
                    <div className='col-md-6'>
                        <button
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
    )
}

export default Checkout
