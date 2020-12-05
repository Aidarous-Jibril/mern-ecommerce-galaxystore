// import {
//     SET_LOADING,
//     SINGLE_ORDER_FETCH_SUCCESS,
//     SINGLE_ORDER_FETCH_FAIL
// } from '../types/orderTypes'

// const initialState = {
//     loading: false,
//     error: null,
//     order: {}
// }

// const orderDetailsReducer = (state = initialState, action) => {
//     switch(action.type){
//         case SET_LOADING:
//             return { ...state, loading: true }
//       case SINGLE_ORDER_FETCH_SUCCESS:
//         return {
//           loading: false,
//           order: action.payload,
//         }
//       case SINGLE_ORDER_FETCH_FAIL:
//         return {
//           loading: false,
//           error: action.payload,
//         }
//       default:
//         return state
//     }
//   }
//   export default orderDetailsReducer
