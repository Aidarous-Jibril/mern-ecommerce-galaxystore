import {
  SET_LOADING,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  SINGLE_ORDER_FETCH_SUCCESS,
  SINGLE_ORDER_FETCH_FAIL,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_RESET,
  ORDER_MY_LIST_SUCCESS,
  ORDER_MY_LIST_FAIL,
  ORDER_MY_LIST_RESET,
} from "../types/orderTypes";

const initialState = {
  order: null,
  loading: true,
  error: null,
  success: false,
  orderDetails: {},
  loadingPay: false,
  successPay: false,
  myOrders: [],
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: true };
    //Create new order case
    case ORDER_CREATE_SUCCESS:
      console.log("Order created successfully");
      return { loading: false, success: true, order: action.payload };
    case ORDER_CREATE_FAIL:
      console.log("Order NOT created");
      return { loading: false, error: action.payload };

    //Get Single order cases
    case SINGLE_ORDER_FETCH_SUCCESS:
      console.log("Order fetched successfully");
      return { loading: false, order: action.payload };
    case SINGLE_ORDER_FETCH_FAIL:
      console.log("Order NOT fetched");
      return { loading: false, error: action.payload };

    // // //Order Pay cases
    // case ORDER_PAY_SUCCESS:
    //   return {
    //     loadingPay: false,
    //     successPay: true,
    //   };
    // case ORDER_PAY_FAIL:
    //   return {
    //     loadingPay: false,
    //     error: action.payload,
    //   };
    // case ORDER_PAY_RESET:
    //   return {};

    //My Orders' list cases
    case ORDER_MY_LIST_SUCCESS:
      return {
        loading: false,
        myOrders: action.payload,
      };
    case ORDER_MY_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_MY_LIST_RESET:
      return { myOrders: [] };
    default:
      return state;
  }
};

export const orderPaymentReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        loading: true,
      };
    case ORDER_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ORDER_PAY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};

export default orderReducer;
