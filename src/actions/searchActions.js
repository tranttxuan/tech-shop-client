import { REMOVE_SEARCH_VALUE, SEARCH_QUERY } from "../constants"

export const searchAction = (searchValue) => (dispatch) => {
    dispatch({
        type: SEARCH_QUERY,
        payload: {
           text: searchValue
        }
    })
};

export const removeSearchValue = () => (dispatch) => {
    dispatch({
        type: REMOVE_SEARCH_VALUE,
        payload: {
           text: ''
        }
    })
}