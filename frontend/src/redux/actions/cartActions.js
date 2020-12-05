import axios from "axios";

import {
  SET_LOADING,
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
} from "../types/cartTypes";

// Set loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};

//Add item to the cart
export const addToCart = (id, qty) => async (dispatch, getState) => {
  setLoading();

  const { data } = await axios.get(`/api/products/${id}`);
  // console.log(data)
  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      id: data._id,
      image: data.image,
      name: data.name,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

//Remove item from the cart
export const removeItemFromCart = (id) => (dispatch, getState) => {
  setLoading();

  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

//Save user's shipping address
export const saveShippingAddress = (formData) => (dispatch) => {
  setLoading();

  dispatch({
    type: CART_SAVE_SHIPPING_ADDRESS,
    payload: formData,
  });
  localStorage.setItem("shippingAddress", JSON.stringify(formData));
};

//Save user's payment address
export const savePaymentMethod = (paymentData) => (dispatch) => {
  setLoading();

  dispatch({
    type: CART_SAVE_PAYMENT_METHOD,
    payload: paymentData,
  });
  localStorage.setItem("paymentMethod", JSON.stringify(paymentData));
};
