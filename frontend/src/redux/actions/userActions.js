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
} from "../types/userTypes";
import { ORDER_MY_LIST_RESET } from "../types/orderTypes";

export const userLoginRequest = (email, password) => async (dispatch) => {
  try {
    setLoading();

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    //Backend api call
    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );

    dispatch({
      type: USER_LOGIN_SUCCESS,
      payload: data,
    });
    //set user data into localStorage
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (err) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: err.response.data.errors,
    });
    console.log(err.response.data.errors);
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
  } catch (err) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: err.response.data.errors,
    });
    console.log(err.response.data.errors);
  }
};

//User details action
export const getUserProfileDetails = (id) => async (dispatch, getState) => {
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

    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload: message,
    });
  }
};

//User Logout
export const userLogoutResquest = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: USER_LOGOUT });
  dispatch({ type: USER_DETAILS_RESET });
  dispatch({ type: ORDER_MY_LIST_RESET });
};

// Set loading to true
export const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};
