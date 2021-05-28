import { ADD_TO_CART, REMOVE_FROM_CART } from "../constants";

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
            console.log({ existItem }, { item })
            if (existItem) {
                return state.map(itemInCart => itemInCart.title === existItem.title
                    ? item
                    : itemInCart
                );
            } else {
                return [...state, item];
            }
        case REMOVE_FROM_CART:
            const removedItem = action.payload;
            return state.filter(itemInCart => itemInCart._id !== removedItem._id)
        default:
            return state
    }
}
