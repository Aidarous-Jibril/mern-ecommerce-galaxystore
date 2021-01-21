import { combineReducers } from "redux";
import cartReducer from "./cartReducer";
import { 
  productListReducer, 
  singleProductDetailsReducer, 
  productDeleteReducer, 
  productUpdateReducer, 
  productCreateReducer,
  productReviewCreateReducer,
  productsTopRatedReducer
 } from "./productReducer";
import {
  userReducers,
  userRegisterReducer,
  userDetailsReducer,
  userListReducer,
  userProfileUpdateReducer,
  userDeleteReducer,
  userUpdateReducer 
} from "./userReducer";
import { orderCreateReducer,
  orderDetailsReducer,
  myOrderListReducer, 
  orderPaymentReducer, 
  ordersListReducer, 
  orderDeliverReducer,
} from "./orderReducers";

const rootReducer = combineReducers({
  productList: productListReducer,
  singleProductDetails: singleProductDetailsReducer,
  productsTopRated: productsTopRatedReducer,
  productCreate: productCreateReducer,
  productDelete: productDeleteReducer,
  productUpdate: productUpdateReducer,
  productReviewCreate: productReviewCreateReducer,
  cart: cartReducer,
  
  user: userReducers,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userProfileUpdate: userProfileUpdateReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer ,

  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  myOrderList: myOrderListReducer,
  orderPayment: orderPaymentReducer,
  orderList: ordersListReducer,
  orderDeliver: orderDeliverReducer,
});

export default rootReducer;
