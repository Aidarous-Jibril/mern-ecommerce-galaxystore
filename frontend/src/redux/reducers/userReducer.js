import {
  SET_LOADING,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
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
} from "../types/userTypes";

const initialState = {
  userInfo: null,
  loading: false,
  error: null,
  successMessage: "",
  allUsers: [],
};

//User Reducer
export const userReducers = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: true };
    case USER_LOGIN_SUCCESS:
      console.log("User logged in successfully");
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      console.log(action.payload);
      return { loading: false, error: action.payload };

    //user register cases
    case USER_REGISTER_SUCCESS:
      console.log("User registered and logged in successfully");
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };

    // user profile update cases
    case USER_UPDATE_PROFILE_SUCCESS:
      return {
        loading: false,
        userInfo: action.payload,
        successMessage: "Updated Successfully",
      };
    case USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: action.payload };

    //user logout cases
    case USER_LOGOUT:
      return { loading: false, userInfo: null };

    //Users list for admin cases
    case USER_LIST_FOR_ADMIN_SUCCESS:
      return { loading: false, allUsers: action.payload };
    case USER_LIST_FOR_ADMIN_FAIL:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

//User Details Reducer
export const userDetailsReducer = (
  state = { userProfileDetails: {} },
  action
) => {
  switch (action.type) {
    case SET_LOADING:
      return { loading: true };
    case USER_DETAILS_SUCCESS:
      return { loading: false, userProfileDetails: action.payload };
    case USER_DETAILS_FAIL:
      // console.log(action.payload)
      return { loading: false, error: action.payload };
    case USER_DETAILS_RESET:
      return { userProfileDetails: {} };
    default:
      return state;
  }
};

// //User Register Reducer
//   export const userRegisterReducer = (state = initialState, action) => {
//     switch (action.type) {
//       case SET_LOADING:
//         return { loading: true }
//       case USER_REGISTER_SUCCESS:
//           console.log('User registered and logged in successfully')
//         return { loading: false, userInfo: action.payload }
//       case USER_REGISTER_FAIL:
//       // console.log(action.payload)
//         return { loading: false, error: action.payload }
//       default:
//         return state
//     }
//   }
