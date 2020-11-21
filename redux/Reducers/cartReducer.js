import { ADD_TO_CART, EMPTY_CART, REMOVE_FROM_CART,EDIT_CART_ICON,EDIT_CART_ME } from '../Types/types';
const initialState = {
    cart: [],
    total: 0,
}


export default function(state=initialState, action) {
    switch(action.type){
          case ADD_TO_CART:
            return {
                ...state,
                cart: [action.payload, ...state.cart],
                total: state.total + action.payload.cost
            }
        case EMPTY_CART:
            return {
                ...state,
                cart: [],
                total: 0
            }
        case REMOVE_FROM_CART:
            return {
                ...state,
                cart: state.cart.filter( item => item.id !== action.payload.id),
            }
        case EDIT_CART_ICON: 
          return {
                ...state,
                cart: state.cart.map(item =>
                item.id === action.payload.id
                    ? {...item, IconName: 'bookmark'}
                    : item,
        ),
     }  
        case EDIT_CART_ME: 
            return {
                    ...state,
                    cart: state.cart.map(item =>
                    item.id === action.payload.id
                        ? {...item, IconName: 'bookmark-o'}
                        : item,
            ),
        }     
        default:
            return state
    }
}