import { SET_VISIBLE } from "../constants";

export const setVisibleDrawer = (state) => (dispatch) => {
    dispatch({
        type: SET_VISIBLE,
        payload: state
    })
};