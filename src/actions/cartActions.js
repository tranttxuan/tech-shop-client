import { ADD_TO_CART, EMPTY_CART, REMOVE_FROM_CART} from "../constants";

export const addProductToCart = (item) => (dispatch, getState) => {
    dispatch({
        type: ADD_TO_CART,
        payload: item
    })
    console.log('object', getState().cart)
    if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(getState().cart));
    }
};

export const removeProductToCart = (item) => (dispatch, getState) => {
    dispatch({
        type: REMOVE_FROM_CART,
        payload: item
    })
    console.log('object', getState().cart)
    if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(getState().cart));
    }
};

export const removeUserCart = () => (dispatch) => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('cart');
    }
    dispatch({
        type: EMPTY_CART,
        payload: [],
    })
}