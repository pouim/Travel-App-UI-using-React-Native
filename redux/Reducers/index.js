import { combineReducers } from  'redux';
import destinationsReducer from './destinationsReducer';
import cartReducer from './cartReducer';
import orderReducer from './orderReducer'



export default combineReducers({
    destinations: destinationsReducer,
    cart: cartReducer,
    order: orderReducer,
})