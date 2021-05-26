import { ADD_TO_CART } from "../constants";

export const addProductToCart = (item) => (dispatch, getState) => {
    dispatch({
        type: ADD_TO_CART,
        payload: item
    })
    if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(getState().cart));
        console.log('check', getState().cart)
    }
};