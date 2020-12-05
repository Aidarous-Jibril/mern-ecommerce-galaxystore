import {
  PRODUCTS_LIST_FETCH_SUCCESS,
  SET_LOADING,
  PRODUCTS_LIST_FETCH_FAIL,
} from "../types/productTypes";

const initialState = {
  products: null,
  loading: false,
  error: null,
};

const productListReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: true };
    case PRODUCTS_LIST_FETCH_SUCCESS:
      return {
        ...state,
        products: action.payload,
        loading: false,
      };
    case PRODUCTS_LIST_FETCH_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default productListReducer;
