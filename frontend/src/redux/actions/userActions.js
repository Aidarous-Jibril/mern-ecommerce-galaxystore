import axios from "axios";
import {
  SET_LOADING,
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_SUCCESS,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_LOGOUT,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_DETAILS_RESET,
  USER_LIST_FOR_ADMIN_SUCCESS,
  USER_LIST_FOR_ADMIN_FAIL,
  USER_DELETE_FOR_ADMIN_SUCCESS,
  USER_DELETE_FOR_ADMIN_FAIL,
  USER_UPDATE_BY_ADMIN_SUCCESS,
  USER_UPDATE_BY_ADMIN_FAIL,
  USER_LOGIN_WITH_GOOGLE_SUCCESS,
  USER_LOGIN_WITH_GOOGLE_FAIL,
  USER_LOGIN_WITH_FACEBOOK_SUCCESS,
  USER_LOGIN_WITH_FACEBOOK_FAIL,
  USER_LIST_FOR_ADMIN_RESET,
} from "../types/userTypes";
import { ORDER_MY_LIST_RESET } from "../types/orderTypes";

export const userLoginRequest = (email, password) => async (dispatch) => {
  try {
    setLoading();

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    }

    const { data } = await axios.post(
      '/api/users/login',
      { email, password },
      config
    )

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    })
    //set user data into localStorage
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:  error.response.data.errors
      // error.response && error.response.data.message
      //   ? error.response.data.message
      //   : error.message,
    });
    // console.log(error.response.data.errors);
    // console.log(error.message);
  }
};

//User Login with GOOGLE
export const userLoginWithGoogle = (response) => async (dispatch) => {
  const config = { tokenId: response.tokenId }
  try {
    setLoading();

    const { data } = await axios.post('/api/users/google', config); 
    //set user data into localStorage
    console.log('in action' + data )
    dispatch({
      type: USER_LOGIN_WITH_GOOGLE_SUCCESS,
      payload: data,
    });
    //set user data into localStorage
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    // if (message === "Not authorized, No token found") {
    //   dispatch(userLogoutResquest());
    // }
    dispatch({
      type: USER_LOGIN_WITH_GOOGLE_FAIL,
      payload: message,
    });
  }
};

//User Login with Facebook
export const userLoginWithFaceBook = (response) => async (dispatch) => {
  const config = { accessToken: response.accessToken, userID: response.userID}
  try {
    setLoading();

    const { data } = await axios.post('/api/users/facebook', config); 
    //set user data into localStorage
    console.log('in action' + data )
    dispatch({
      type: USER_LOGIN_WITH_FACEBOOK_SUCCESS,
      payload: data,
    });
    //set user data into localStorage
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    // if (message === "Not authorized, No token found") {
    //   dispatch(userLogoutResquest());
    // }
    dispatch({
      type: USER_LOGIN_WITH_FACEBOOK_FAIL,
      payload: message,
    });
  }
};

//User register Request Action
export const userRegisterRequest = (name, email, password) => async (
  dispatch
) => {
  try {
    setLoading();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    //Backend api call
    const { data } = await axios.post(
      "/api/users/register",
      { name, email, password },
      config
    );

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data,
    });
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });

    //set user data into localStorage
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response.data.errors,
    });
    console.log(error.response.data.errors);
  }
};

//User details action
export const getUserProfileDetails = (id) => async (dispatch, getState) => {
  try {
    setLoading();

    const { user: { userInfo } } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/users/${id}`, config);

    dispatch({
      type: USER_DETAILS_SUCCESS,
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
      type: USER_DETAILS_FAIL,
      payload: message,
    });
  }
};

//User details action
export const updateUserProfileDetails = (userCreds) => async (
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

    const { data } = await axios.put("/api/users/profile", userCreds, config);

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, No token found") {
      dispatch(userLogoutResquest());
    }
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: message,
    });
  }
};

//User Logout
export const userLogoutResquest = () => (dispatch) => {
  localStorage.removeItem('userInfo')
  localStorage.removeItem('cartItems')
  localStorage.removeItem('shippingAddress')
  localStorage.removeItem('paymentMethod')
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: ORDER_MY_LIST_RESET });
  dispatch({ type: USER_LIST_FOR_ADMIN_RESET });
  
  document.location.href = '/login'
};

//Admin gets all users
export const getUserList = () => async (dispatch, getState) => {
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

    const { data } = await axios.get(`/api/users`, config);

    dispatch({
      type: USER_LIST_FOR_ADMIN_SUCCESS,
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
      type: USER_LIST_FOR_ADMIN_FAIL,
      payload: message,
    });
  }
};

//Admin gets all users
export const deleteUser = (id) => async (dispatch, getState) => {
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

    const { data } = await axios.delete(`/api/users/${id}`, config)

    dispatch({
      type: USER_DELETE_FOR_ADMIN_SUCCESS,
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
      type: USER_DELETE_FOR_ADMIN_FAIL,
      payload: message,
    });
  }
};
 
//Admin updates user
export const updateUser = (user) => async (dispatch, getState) => {
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
    
    const { data } = await axios.put(`/api/users/${user._id}`, user, config)

    dispatch({
      type: USER_UPDATE_BY_ADMIN_SUCCESS,
      payload: data,
    });
    dispatch({
      type: USER_DETAILS_SUCCESS,
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
      type: USER_UPDATE_BY_ADMIN_FAIL,
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
