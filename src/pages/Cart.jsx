import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ProductCardInCheckout from '../components/cards/ProductCardInCheckout';
import { userCart } from '../functions/user';

function Cart({ history }) {
    const { cart, user } = useSelector(state => ({ ...state }));
    const dispatch = useDispatch();
    const gerTotal = () =>
        cart.reduce((acc, item) => {
            return acc + item.count * item.price;
        }, 0);

    const saveOrderToDB = () => {
        userCart(cart, user.token)
            .then(response => history.push("/checkout"))
            .catch(err => toast.error(err.message));
    }

    const showCartItem = () => (
        <table className='table table-bordered'>
            <thead className='thead-light'>
                <tr>
                    <th scope='col'>Image</th>
                    <th scope='col'>Title</th>
                    <th scope='col'>Price</th>
                    <th scope='col'>Brand</th>
                    <th scope='col'>Color</th>
                    <th scope='col'>Count</th>
                    <th scope='col'>Shipping</th>
                    <th scope='col'>Remove</th>
                </tr>
            </thead>
            <tbody>
                {cart.map(prod => <ProductCardInCheckout key={prod._id} product={prod} />)}
            </tbody>
        </table>
    )

    return (
        <div className='container-fluid pt-2'>
            <div className='row'>
                <div className='col-md-8'>
                    <h4>Cart:
                    {cart.length !== 0 && <span>{cart.length} product{cart.length !== 1 && "s"}</span>}
                    </h4>
                    {!cart.length
                        ? <p>No product in cart? <Link to="/shop">Continue Shopping</Link></p>
                        : showCartItem()}
                </div>

                <div className='col-md-4'>
                    <h4>Order Summary</h4>
                    <hr />
                    <p>Products</p>
                    <table className="table table-striped">
                        <tbody>
                            {cart.map(item =>
                                <tr key={item.title}>
                                    <td >{`${item.title}`}</td>
                                    <td >x</td>
                                    <td >{item.count}</td>
                                    <td >=</td>
                                    <td >${item.price * item.count}</td>
                                </tr>
                            )}
                            <tr>
                                <td colSpan='3'><em>Total:</em></td>
                                <td >=</td>
                                <td><strong>${gerTotal()}</strong></td>
                            </tr>
                        </tbody>
                    </table>
                    <div className='d-flex justify-content-around'>
                        {user
                            ? <button
                                onClick={saveOrderToDB}
                                disabled={!cart.length}
                                className='btn btn-sm btn-primary btn-block btn-raised mt-2'>
                                Proceed to checkout
                            </button>
                            : <button className='btn btn-sm btn-primary btn-block mt-2'>
                                <Link to={{ pathname: '/login', state: { from: 'cart' } }}>Login to checkout</Link>
                            </button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart
