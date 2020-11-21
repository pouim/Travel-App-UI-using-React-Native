import { ADD_TO_CART, REMOVE_FROM_CART, EMPTY_CART, EDIT_ICON, EDIT_CART_ICON, EDIT_CART_ME } from '../Types/types';

export const addToCart = (item) => dispatch => {
    dispatch({
        type: ADD_TO_CART,
        payload: item
    })
}


export const removeItem = (item) => dispatch => {
    dispatch({
        type: REMOVE_FROM_CART,
        payload: item
    })
}


export const emptyCart = () => dispatch => {
    dispatch({
        type: EMPTY_CART
    })
}

export const editCartIcon = (item) => dispatch => {
    dispatch({
        type: EDIT_CART_ICON ,
        payload: item
    })
}

export const editCartMe = (item) => dispatch => {
    dispatch({
        type: EDIT_CART_ME ,
        payload: item
    })
}
