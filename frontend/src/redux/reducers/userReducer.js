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
  USER_UPDATE_PROFILE_RESET,
  USER_DETAILS_RESET,
  USER_LIST_FOR_ADMIN_SUCCESS,
  USER_LIST_FOR_ADMIN_FAIL,
  USER_LIST_FOR_ADMIN_RESET,
  USER_DELETE_FOR_ADMIN_SUCCESS,
  USER_DELETE_FOR_ADMIN_FAIL,
  USER_UPDATE_BY_ADMIN_SUCCESS,
  USER_UPDATE_BY_ADMIN_FAIL,
  USER_UPDATE_BY_ADMIN_RESET,
  USER_LOGIN_WITH_GOOGLE_SUCCESS,
  USER_LOGIN_WITH_GOOGLE_FAIL,
} from "../types/userTypes";

//User Reducer
export const userReducers = (state = {}, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: true };

    //User login cases
    case USER_LOGIN_SUCCESS:
    case USER_LOGIN_WITH_GOOGLE_SUCCESS:
      console.log(action.payload );
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
    case USER_LOGIN_WITH_GOOGLE_FAIL:  
      console.log('login error', action.payload);
      return { loading: false,  error: action.payload }

    //user logout cases
    case USER_LOGOUT:
      return { loading: false, userInfo: null };
      
      default:
        return state;
      }
    };
    
  //User Register Reducer
  export const userRegisterReducer = (state = { }, action) => {
    switch (action.type) {
      case SET_LOADING:
        return { loading: true }
      case USER_REGISTER_SUCCESS:
          console.log('User registered and logged in successfully')
        return { loading: false, userInfo: action.payload }
      case USER_REGISTER_FAIL:
      // console.log(action.payload)
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }

    
    
  //User Details Reducer
  export const userProfileUpdateReducer = ( state = { }, action ) => {
    switch (action.type) {
      case SET_LOADING:
        return { loading: true };
      case USER_UPDATE_PROFILE_SUCCESS:
        return { loading: false, success: true, userInfo: action.payload };
      case USER_UPDATE_PROFILE_FAIL:
        return { loading: false, error: action.payload };
      case USER_UPDATE_PROFILE_RESET:
        return { }   
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

    //ADMIN: Users List reducer
    export const userListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: true };
    //Users' list cases for admin user
    case USER_LIST_FOR_ADMIN_SUCCESS:
      return { loading: false, users: action.payload };
    case USER_LIST_FOR_ADMIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LIST_FOR_ADMIN_RESET:
      return {}
    default:
      return state;
  }
};


    //ADMIN: Users Delete reducer
    export const userDeleteReducer = (state = { users: [] }, action) => {
      switch (action.type) {
        case SET_LOADING:
          return { ...state, loading: true };
        //User delete cases By admin user
        case USER_DELETE_FOR_ADMIN_SUCCESS:
          return{
            ...state,
            users: state.users.filter(user => user._id !== action.payload.id),
            success: true
        }
        case USER_DELETE_FOR_ADMIN_FAIL:
          return { loading: false, error: action.payload };
    
        default:
          return state;
      }
    };

    //ADMIN: Users Edit reducer
    export const userUpdateReducer = (state = { user: {} }, action) => {
      switch (action.type) {
        case SET_LOADING:
          return { ...state, loading: true };

        case USER_UPDATE_BY_ADMIN_SUCCESS:
          return { loading: false, 
             success: true 
            }
        case USER_UPDATE_BY_ADMIN_FAIL:
          return { loading: false, error: action.payload }
        case USER_UPDATE_BY_ADMIN_RESET:
          return {
            user: {},
          }
        default:
          return state
      }
    }
    
