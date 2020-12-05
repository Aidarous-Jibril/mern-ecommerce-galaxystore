import axios from "axios";
import {
  PRODUCTS_LIST_FETCH_SUCCESS,
  SET_LOADING,
  PRODUCTS_LIST_FETCH_FAIL,
  SINGLE_PRODUCT_FETCH_SUCCESS,
  SINGLE_PRODUCT_FETCH_FAIL,
} from "../types/productTypes";

export const getProductsList = () => async (dispatch) => {
  try {
    setLoading();
    const { data } = await axios.get("/api/products");

    dispatch({
      type: PRODUCTS_LIST_FETCH_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCTS_LIST_FETCH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

//Fetch single product
export const getSingleProduct = (id) => async (dispatch) => {
  try {
    setLoading();
    const { data } = await axios.get(`/api/products/${id}`);

    dispatch({
      type: SINGLE_PRODUCT_FETCH_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: SINGLE_PRODUCT_FETCH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Set loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
