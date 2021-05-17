import { LOGGED_IN_USER, LOGOUT } from "../constants"

export const signin = (email, name, role, _id, token) => (dispatch) => {
    dispatch({
        type: LOGGED_IN_USER,
        payload: {
            email, name, role, _id, token
        }
    })
};

export const signout = () => (dispatch) => {
    dispatch({
        type: LOGOUT,
        payload: null
    });
}