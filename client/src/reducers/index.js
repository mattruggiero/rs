import { combineReducers } from 'redux';
import authReducer from './authReducer';
import inventoryReducer from './inventoryReducer';
import errorReducer from './errorReducer';
import cartReducer from './cartReducer';





export default combineReducers({
    auth: authReducer,
    inventory: inventoryReducer,
    error: errorReducer,
    cart:cartReducer,
})