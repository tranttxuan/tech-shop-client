import { SEARCH_QUERY } from "../constants"

export const searchAction = (searchValue) => (dispatch) => {
    dispatch({
        type: SEARCH_QUERY,
        payload: {
           text: searchValue
        }
    })
}