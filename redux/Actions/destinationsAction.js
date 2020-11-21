import { FETCH_PRODUCTS, UPDATE_PRODUCTS, EDIT_ICON, EDIT_ME} from '../Types/types';
import { getData } from '../../mocks';

export const fetchProducts = () => dispatch => {
    const destinations = getData();
     dispatch({
        type: FETCH_PRODUCTS,
        payload: destinations
    })
}

export const updateProducts = (item) => dispatch => {
    dispatch({
        type: UPDATE_PRODUCTS ,
        payload: item
    })
}


export const editIcon = (item) => dispatch => {
    dispatch({
        type: EDIT_ICON ,
        payload: item
    })
}

export const editMe = (item) => dispatch => {
    dispatch({
        type: EDIT_ME ,
        payload: item
    })
}
