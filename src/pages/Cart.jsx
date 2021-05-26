import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

function Cart() {
    const {cart, user} = useSelector(state => ({...state}));
    const dispatch = useDispatch();
console.log(cart);
    return (
        <div className='container-fluid'>
            <div className='row'>
                <h4>Cart</h4>
            </div>
        </div>
    )
}

export default Cart
