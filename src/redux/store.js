import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducer/user-reducer';
import itemReducer from './reducer/item-reducer';
import logReducer from './reducer/log-reducer';
import cartReducer from './reducer/cart-reducer';
import authReducer from './reducer/auth-reducer';

export default configureStore({
    reducer: {
        account: userReducer,
        items: itemReducer,
        logs: logReducer,
        cart: cartReducer,
        auth: authReducer
    }
});