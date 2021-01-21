import {
  SET_LOADING,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  SINGLE_ORDER_ITEMS_FETCH_SUCCESS,
  SINGLE_ORDER_ITEMS_FETCH_FAIL,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_RESET,
  ORDER_MY_LIST_SUCCESS,
  ORDER_MY_LIST_FAIL,
  ORDER_MY_LIST_RESET,
  ORDERS_LIST_GET_BY_ADMIN_SUCCESS,
  ORDERS_LIST_GET_BY_ADMIN_FAIL,
  ORDER_SET_TO_DELIVERY_BY_ADMIN_SUCCESS,
  ORDER_SET_TO_DELIVERY_BY_ADMIN_FAIL,
  ORDER_SET_TO_DELIVERY_BY_ADMIN_RESET,
} from "../types/orderTypes";

//Create new order Reducer
export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: true };
    case ORDER_CREATE_SUCCESS:
      console.log("Order created successfully");
      return { loading: false, success: true, order: action.payload };
    case ORDER_CREATE_FAIL:
      console.log("Order NOT created");
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

//Order items details Reducer
export const orderDetailsReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        loading: true,
      }
    case SINGLE_ORDER_ITEMS_FETCH_SUCCESS:
      return {
        loading: false,
        orderItems: action.payload,
      }
    case SINGLE_ORDER_ITEMS_FETCH_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

//my Order's list
export const myOrderListReducer = (state = { myOrders: [] }, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        loading: true,
      }
    case ORDER_MY_LIST_SUCCESS:
      return {
        loading: false,
        myOrders: action.payload,
      }
    case ORDER_MY_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case ORDER_MY_LIST_RESET:
      return { myOrders: [] }
    default:
      return state
  }
}
//Mark order tobe paid reducer
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

//Mark order of out tobe delivered reducer
export const orderDeliverReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        loading: true,
      };
    case ORDER_SET_TO_DELIVERY_BY_ADMIN_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ORDER_SET_TO_DELIVERY_BY_ADMIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_SET_TO_DELIVERY_BY_ADMIN_RESET:
      return {};
    default:
      return state;
  }
};

//All orders List Reducer
export const ordersListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: true };
    case ORDERS_LIST_GET_BY_ADMIN_SUCCESS:
      return {
        ...state,
        orders: action.payload,  
        loading: false,
      };
    case ORDERS_LIST_GET_BY_ADMIN_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

