import axios from "axios";

export const userCart = async (cart, authtoken) => {
    return await axios.post(`${process.env.REACT_APP_API}/user/cart`,
        { cart },
        { headers: { authtoken } })
};

export const getUserCart = async (authtoken) => {
    return await axios.get(`${process.env.REACT_APP_API}/user/cart`,
        { headers: { authtoken } })
};

export const emptyUserCart = async (authtoken) => {
    return await axios.delete(`${process.env.REACT_APP_API}/user/cart`,
        { headers: { authtoken } })
};

export const saveUserAddress = async (authtoken, address) => {
    return await axios.post(`${process.env.REACT_APP_API}/user/address`,
        { address },
        { headers: { authtoken } })
};

export const applyCoupon = async (coupon, authtoken) => {
    return await axios.post(`${process.env.REACT_APP_API}/user/cart/coupon`,
        { name: coupon },
        {
            headers: { authtoken }
        })
};

export const createOrder = async (stripeResponse, authtoken) => {
    return await axios.post(`${process.env.REACT_APP_API}/user/order`,
        { stripeResponse },
        {
            headers: { authtoken }
        })
};

export const getUserOrders = async (authtoken) => {
    return await axios.get(`${process.env.REACT_APP_API}/user/order`,
        {
            headers: { authtoken }
        })
};

export const getWishlist = async (authtoken) => {
    return await axios.get(`${process.env.REACT_APP_API}/user/wishlist`,
        {
            headers: { authtoken }
        })
};

export const addToWishlist = async (productId, authtoken) => {
    return await axios.post(`${process.env.REACT_APP_API}/user/wishlist`,
        { productId },
        {
            headers: { authtoken }
        })
};

export const removeWishlist = async (productId, authtoken) => {
    return await axios.post(`${process.env.REACT_APP_API}/user/wishlist/${productId}`, 
    {},
    {
        headers: { authtoken }
    })
};