import { SEARCH_QUERY, REMOVE_SEARCH_VALUE } from "../constants";

export const searchReducer = (state = { text: '' }, action) => {
    switch (action.type) {
        case SEARCH_QUERY:
            return action.payload;
        case REMOVE_SEARCH_VALUE:
            return action.payload;
        default:
            return state
    }
}