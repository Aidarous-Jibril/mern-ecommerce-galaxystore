import axios from "axios";
import {
  SET_LOADING,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  SINGLE_ORDER_FETCH_SUCCESS,
  SINGLE_ORDER_FETCH_FAIL,
  ORDER_PAY_FAIL,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_RESET,
  ORDER_MY_LIST_SUCCESS,
  ORDER_MY_LIST_FAIL,
} from "../types/orderTypes";

//Create order action
export const createOrderAction = (orderData) => async (dispatch, getState) => {
  try {
    setLoading();

    const {
      user: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post("/api/orders", orderData, config);

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });

    //   localStorage.setItem('userInfo', JSON.stringify(data))
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: message,
    });
  }
};

//Get single order details action
export const getSingleOrderDetailsAction = (orderId) => async (
  dispatch,
  getState
) => {
  try {
    setLoading();

    const {
      user: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/${orderId}`, config);

    dispatch({
      type: SINGLE_ORDER_FETCH_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: SINGLE_ORDER_FETCH_FAIL,
      payload: message,
    });
  }
};

//Order pay action
export const orderPaymentAction = (orderId, paymentResult) => async (
  dispatch,
  getState
) => {
  try {
    setLoading();

    const {
      user: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(
      `/api/orders/${orderId}/payment`,
      paymentResult,
      config
    );

    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: ORDER_PAY_FAIL,
      payload: message,
    });
  }
};

// Set loading to true
export const orderResetEfterPaymentAction = () => {
  return {
    type: ORDER_PAY_RESET,
  };
};

//List of my Orders
export const myOrdersListAction = () => async (dispatch, getState) => {
  try {
    setLoading();

    const {
      user: { userInfo },
    } = getState();

    const config = { headers: { Authorization: `Bearer ${userInfo.token}` } };

    const { data } = await axios.get("/api/orders/myorders", config);

    dispatch({
      type: ORDER_MY_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    dispatch({
      type: ORDER_MY_LIST_FAIL,
      payload: message,
    });
  }
};

// Set loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
