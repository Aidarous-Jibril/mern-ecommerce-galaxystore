import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import productListReducer from "./productReducer";
import singleProductDetailsReducer from "./singleProductDetailsReducer";
import { userReducers, userDetailsReducer } from "./userReducer";
import { orderReducer, orderPaymentReducer } from "./orderReducers";

const rootReducer = combineReducers({
  productList: productListReducer,
  singleProductDetails: singleProductDetailsReducer,
  cart: cartReducer,
  user: userReducers,
  // loggedinUser: userLoginReducer,
  // userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  orders: orderReducer,
  orderPayment: orderPaymentReducer,
});

export default rootReducer;
