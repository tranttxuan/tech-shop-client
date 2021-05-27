import { ADD_TO_CART } from "../constants";

//Initial state
const initialState = typeof window !== 'undefined'
    ?
    localStorage.getItem('cart')
        ? JSON.parse(localStorage.getItem('cart'))
        : []
    : [];

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload;
            const existItem = state.find(itemInCart => itemInCart.title === item.title);
            if (existItem) {
                 return [
                      ...state,
                    state.find(itemInCart =>
                           itemInCart.title === existItem.title ? item : itemInCart)
                      ];
            } else {
                 return  [...state, item];
            }
        default:
            return state
    }
}