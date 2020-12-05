import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import rootReducer from './reducers/rootReducer'
// const rootReducer = combineReducers({})

//If we have cart items in localStorage, set that in the cartItems state when page gets loaded
const cartItemsFromLocalStorage = localStorage.getItem('cartItems') ? 
    JSON.parse( localStorage.getItem('cartItems')) : []
//If we have shipping address in localStorage, set that in the shippingAddress state when page gets loaded
const shippingAddressFromLocalStorage = localStorage.getItem('shippingAddress') ? 
    JSON.parse( localStorage.getItem('shippingAddress')) : {}

//If we have userInfo in localStorage, set that in the userInfo state when page gets loaded
const userInfoFromLocalStorage = localStorage.getItem('userInfo') ? 
    JSON.parse( localStorage.getItem('userInfo')) : null

const initialState = {
    cart: { cartItems: cartItemsFromLocalStorage, shippingAddress: shippingAddressFromLocalStorage },
    user: { userInfo: userInfoFromLocalStorage}
};

const middleware = [thunk]
const store = createStore(
    rootReducer, 
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware))
    );

    export default store