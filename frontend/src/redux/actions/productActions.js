import axios from "axios";
import {
  SET_LOADING,
  PRODUCTS_LIST_FETCH_SUCCESS,
  PRODUCTS_LIST_FETCH_FAIL,
  SINGLE_PRODUCT_FETCH_SUCCESS,
  SINGLE_PRODUCT_FETCH_FAIL,
  PRODUCT_DELETE_BY_ADMIN_SUCCESS,
  PRODUCT_DELETE_BY_ADMIN_FAIL,
  PRODUCT_UPDATE_BY_ADMIN_SUCCESS,
  PRODUCT_UPDATE_BY_ADMIN_FAIL,
  PRODUCT_CREATE_BY_ADMIN_SUCCESS,
  PRODUCT_CREATE_BY_ADMIN_FAIL,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCTS_TOP_RATED_FETCH_SUCCESS,
  PRODUCTS_TOP_RATED_FETCH_FAIL,
} from "../types/productTypes";
import { userLogoutResquest } from "./userActions";

//Get all products
export const getProductsList = (keyword = '', pageNumber= '') => async (dispatch) => {
  try {
    setLoading();
    const { data } = await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`);

    dispatch({
      type: PRODUCTS_LIST_FETCH_SUCCESS,
      payload: data,
    });
    // console.log('fetch all products:', data)
  } catch (error) {
    dispatch({
      type: PRODUCTS_LIST_FETCH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    console.log('fetch all products error:', error)
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

//Admin Creates product
export const createProduct = () => async (dispatch, getState) => {
  try {
    setLoading();

    const {
      user: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/products`, {}, config)

    dispatch({
      type: PRODUCT_CREATE_BY_ADMIN_SUCCESS,
      payload: data
    });
  
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, No token found") {
      dispatch(userLogoutResquest());
    }
    dispatch({
      type: PRODUCT_CREATE_BY_ADMIN_FAIL,
      payload: message,
    });
  }
};

//Admin deletes product
export const deleteProduct = (id) => async (dispatch, getState) => {
  try {
    setLoading();

    const {
      user: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.delete(`/api/products/${id}`, config)

    dispatch({
      type: PRODUCT_DELETE_BY_ADMIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, No token found") {
      dispatch(userLogoutResquest());
    }
    dispatch({
      type: PRODUCT_DELETE_BY_ADMIN_FAIL,
      payload: message,
    });
  }
};
 

//Admin Updates product
export const updateProduct = (product) => async (dispatch, getState) => {
  try {
    setLoading();

    const {
      user: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Conten-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/products/${product._id}`, product, config)

    dispatch({
      type: PRODUCT_UPDATE_BY_ADMIN_SUCCESS,
      payload: data,
    });
    // dispatch({
    //   type: SINGLE_PRODUCT_FETCH_SUCCESS,
    //   payload: data,
    // });
    
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, No token found") {
      dispatch(userLogoutResquest());
    }
    dispatch({
      type: PRODUCT_UPDATE_BY_ADMIN_FAIL,
      payload: message,
    });
  }
};
 
 
//create Product Review 
export const createProductReview = (productId, reviewObj) => async (dispatch, getState) => {
  try {
    setLoading();

    const {
      user: { userInfo },
    } = getState();

    const config = {
      headers: {
        'Conten-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.post(`/api/products/${productId}/reviews`, reviewObj, config)

    dispatch({
      type: PRODUCT_CREATE_REVIEW_SUCCESS,
    });
  } catch (error) {
    console.log(error.message)
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(userLogoutResquest())
    }
    dispatch({
      type: PRODUCT_CREATE_REVIEW_FAIL,
      payload: message,
    })
  }
}

//Get Top rated products action
export const getTopRatedProducts = () => async (dispatch) => {
  try {
    setLoading();
    const { data } = await axios.get(`/api/products/top`);

    dispatch({
      type: PRODUCTS_TOP_RATED_FETCH_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PRODUCTS_TOP_RATED_FETCH_FAIL,
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
