import {
  SET_LOADING,
  PRODUCTS_LIST_FETCH_SUCCESS,
  PRODUCTS_LIST_FETCH_FAIL,
  SINGLE_PRODUCT_FETCH_SUCCESS,
  SINGLE_PRODUCT_FETCH_FAIL,
  PRODUCT_CREATE_BY_ADMIN_SUCCESS,
  PRODUCT_CREATE_BY_ADMIN_FAIL,
  PRODUCT_DELETE_BY_ADMIN_SUCCESS,
  PRODUCT_DELETE_BY_ADMIN_FAIL,
  PRODUCT_UPDATE_BY_ADMIN_SUCCESS,
  PRODUCT_UPDATE_BY_ADMIN_FAIL,
  PRODUCT_UPDATE_BY_ADMIN_RESET,
  PRODUCT_CREATE_REVIEW_SUCCESS,
  PRODUCT_CREATE_REVIEW_FAIL,
  PRODUCT_CREATE_REVIEW_RESET,
  PRODUCTS_TOP_RATED_FETCH_SUCCESS,
  PRODUCTS_TOP_RATED_FETCH_FAIL,
} from "../types/productTypes";


//All products reducer
export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: true };
    case PRODUCTS_LIST_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload.allProducts,
        totalPages: action.payload.totalPages,
        page: action.payload.page,
      };
    case PRODUCTS_LIST_FETCH_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

//Single product details reducer
export const singleProductDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: true };
    case SINGLE_PRODUCT_FETCH_SUCCESS:
      return { ...state, product: action.payload, loading: false, };
    case SINGLE_PRODUCT_FETCH_FAIL:
      return { ...state, error: action.payload, loading: false,};
    default:
      return state;
  }
};


    //ADMIN: Product create reducer
    export const productCreateReducer = (state = { product : {} }, action) => {
      switch (action.type) {
        case SET_LOADING:
          return { ...state, loading: true };
        case PRODUCT_CREATE_BY_ADMIN_SUCCESS:
          return{
            ...state, product: action.payload, success: true }
        case PRODUCT_CREATE_BY_ADMIN_FAIL:
          return { loading: false, error: action.payload };  
        default:
          return state;
      }
    };

    //ADMIN: Product Delete reducer
    export const productDeleteReducer = (state = {  }, action) => {
      switch (action.type) {
        case SET_LOADING:
          return { ...state, loading: true };
        case PRODUCT_DELETE_BY_ADMIN_SUCCESS:
          return{
            ...state, success: true }
        case PRODUCT_DELETE_BY_ADMIN_FAIL:
          return { loading: false, error: action.payload };  
        default:
          return state;
      }
    };

      //ADMIN: Product Delete reducer
      export const productUpdateReducer = (state = { product: {} }, action) => {
        switch (action.type) {
          case SET_LOADING:
            return { loading: true }
          case PRODUCT_UPDATE_BY_ADMIN_SUCCESS:
            return { loading: false, success: true, product: action.payload }
          case PRODUCT_UPDATE_BY_ADMIN_FAIL:
            return { loading: false, error: action.payload }
          case PRODUCT_UPDATE_BY_ADMIN_RESET:
            return { product: {} }
          default:
            return state
        }
      }
      
      //Product Review Create reducer
      export const productReviewCreateReducer = (state = { }, action) => {
        switch (action.type) {
          case SET_LOADING:
            return { loading: true }
          case PRODUCT_CREATE_REVIEW_SUCCESS:
            return { loading: false, success: true }
          case PRODUCT_CREATE_REVIEW_FAIL:
            return { loading: false, error: action.payload }
          case PRODUCT_CREATE_REVIEW_RESET:
            return { }
          default:
            return state
        }
      }

  //Get top rated products reducer
  export const productsTopRatedReducer = (state = { topProducts: [] }, action) => {
    switch (action.type) {
      case SET_LOADING:
        return { loading: true, topProducts: [] }
      case PRODUCTS_TOP_RATED_FETCH_SUCCESS:
        return { loading: false, topProducts: action.payload }
      case PRODUCTS_TOP_RATED_FETCH_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }