import React, { useEffect, useState } from 'react';
import './StripeCheckout.css';
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from 'react-redux';
import { createPaymentIntent } from '../functions/stripe';
import { Link } from 'react-router-dom';
import { Card } from "antd";
import { CheckOutlined, DollarOutlined } from '@ant-design/icons';

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
    const [totalAfterDiscount, setTotalAfterDiscount]= useState(0);

    const dispatch = useDispatch();
    const { user, coupon } = useSelector(state => ({ ...state }));

    useEffect(() => {
        createPaymentIntent(user.token, coupon)
            .then(res => {
                console.log('----', res.data);
                const { clientSecret, cartTotal, payable, totalAfterDiscount } = res.data
                setClientSecret(clientSecret);
                setCartTotal(cartTotal);
                setPayable(payable);
                setTotalAfterDiscount(totalAfterDiscount);
            })
            .catch(err => console.log(err))
    }, []);

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

        console.log('check payload ----', payload);
        if (payload.error) {
            setError(`Payment failed ${payload.error.message}`);
            setProcessing(false)
        } else {
            console.log(JSON.stringify(payload, null, 4));
            setError(null);
            setProcessing(false);
            setSucceeded(true);
        }
    }

    const handleChange = (e) => {
        // listen for change in card element
        // and display any errors as the customer types hos card details 
        //  disable pay button if errors
        setDisabled(e.empty);
        // show error message
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
                        <img style={{ height: '200px', objectFit: 'cover', marginBottom: '-50px' }} />
                    }
                    actions={[
                        <>
                            <DollarOutlined className='text-info' />
                            <br /> Total: ${cartTotal}
                        </>,
                        <>
                            <CheckOutlined className='text-info' />
                            <br /> Total payable: ${payable}
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
                <p className={succeeded ? 'result-message' : 'result-message hidden'}>
                    Payment Successful.{" "}
                    <Link to="/user/history">See it in your purchase history</Link>
                </p>
            </form>
        </>
    )
}

export default StripeCheckout
