import {
  SET_LOADING,
  SINGLE_PRODUCT_FETCH_SUCCESS,
  SINGLE_PRODUCT_FETCH_FAIL,
} from "../types/productTypes";

const initialState = {
  product: null,
  reviews: [],
  loading: false,
  error: null,
};

const singleProductDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: true };
    case SINGLE_PRODUCT_FETCH_SUCCESS:
      return {
        ...state,
        product: action.payload,
        loading: false,
      };
    case SINGLE_PRODUCT_FETCH_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default singleProductDetailsReducer;
