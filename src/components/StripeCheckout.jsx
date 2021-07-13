import React, { useEffect, useState } from 'react';
import './StripeCheckout.css';
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from 'react-redux';
import { createPaymentIntent } from '../functions/stripe';
import { Link, useHistory } from 'react-router-dom';
import { Card } from "antd";
import { CheckOutlined, DollarOutlined } from '@ant-design/icons';
import { createOrder, emptyUserCart } from '../functions/user';
import { removeUserCart } from '../actions/cartActions';
import { applyCouponAction } from '../actions/userActions';
import Image from "./../assets/payment_methods.jpeg";

function StripeCheckout() {
    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false);
    const [error, setError] = useState(null);
    const [processing, setProcessing] = useState('');
    const [disabled, setDisabled] = useState();
    const [clientSecret, setClientSecret] = useState('');
    const [cartTotal, setCartTotal] = useState(0);
    const [payable, setPayable] = useState(0);
    const [totalAfterDiscount, setTotalAfterDiscount] = useState(0);

    const dispatch = useDispatch();
    const { user, coupon } = useSelector(state => ({ ...state }));

    const history = useHistory();

    useEffect(() => {
        createPaymentIntent(user.token, coupon)
            .then(res => {
                if(typeof res.data === "string"){
                    history.push("/cart");
                }
                const { clientSecret, cartTotal, payable, totalAfterDiscount } = res.data
                setClientSecret(clientSecret);
                setCartTotal(cartTotal);
                setPayable(payable);
                setTotalAfterDiscount(totalAfterDiscount);
            })
            .catch(err => console.log(err))
    }, [coupon, user.token]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            // Stripe.js has not loaded yet. Make sure to disable
            // form submission until Stripe.js has loaded.
            return;
        }
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {

                }
            }
        })
        if (payload.error) {
            setError(`Payment failed ${payload.error.message}`);
            setProcessing(false)
        } else {
            createOrder(payload, user.token)
                .then(res => {
                    dispatch(removeUserCart());
                    dispatch(applyCouponAction(false));
                    emptyUserCart(user.token)
                        .then(response => console.log(response))
                        .catch(response => console.log(response))
                })
                .catch(err => console.log(err))
            setError(null);
            setProcessing(false);
            setSucceeded(true);
        }
    }

    const handleChange = (e) => {
        setDisabled(e.empty);
        setError(e.error ? e.error.message : '')
    }

    const cartStyle = {
        style: {
            base: {
                color: "#32325d",
                fontFamily: "Arial, sans-serif",
                fontSmoothing: "antialiased",
                fontSize: "16px",
                "::placeholder": {
                    color: "#32325d",
                },
            },
            invalid: {
                color: "#fa755a",
                iconColor: "#fa755a",
            },
        },
    };

    return (
        <>
            {
                !succeeded && <div>
                    {coupon && totalAfterDiscount !== undefined
                        ? <p className='alert alert-success'>Total after discount: ${totalAfterDiscount}</p>
                        : <p className='alert alert-danger'>No coupon applied</p>
                    }
                </div>
            }
            <div className='text-center pb-5'>
                <Card
                    cover={
                        <img src={Image} style={{ height: '200px', objectFit: 'cover', marginBottom: '-50px' }} alt='img-card' />
                    }
                    actions={[
                        <>
                            <DollarOutlined className='text-info' />
                            <br /> Total: <span className='font-weight-bold'>${cartTotal}</span>
                        </>,
                        <>
                            <CheckOutlined className='text-info' />
                            <br /> Total payable: <span>${payable}</span>
                        </>,
                    ]}
                />
            </div>
            <form id="payment-form" className='stripe-form' onSubmit={handleSubmit}>
                <CardElement
                    id='card-element'
                    options={cartStyle}
                    onChange={handleChange}
                />
                <button type='submit' className='stripe-button' disabled={processing || disabled || succeeded}>
                    <span id='button-text'>
                        {processing ? <div className='spinner' id='spinner' /> : 'Pay'}
                    </span>
                </button>
                {error && <div className='card-error' role='alert'>{error}</div>}
                <br />
                <p className={succeeded ? 'result-message font-weight-bold' : 'result-message hidden'}>
                    Payment Successful.{" "}
                    <Link to="/user/history">See it in your purchase history</Link>
                </p>
            </form>
        </>
    )
}

export default StripeCheckout
