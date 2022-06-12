/* eslint-disable import/no-anonymous-default-export */
import { userConstants } from "../actions/constants";

const initState = {
  error: null,
  message: "",
  loading: false,
  users: [],
  userDetail: {},
};

export default (state = initState, action) => {
  switch (action.type) {
    case userConstants.USER_REGISTER_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case userConstants.USER_REGISTER_SUCCESS:
      state = {
        ...state,
        loading: false,
        message: action.payload.message,
      };
      break;
    case userConstants.USER_REGISTER_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
    case userConstants.GET_ALL_USERS_SUCCESS:
      state = {
        ...state,
        users: action.payload.users,
      };
      break;
    case userConstants.GET_USER_DETAIL_BY_ID_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case userConstants.GET_USER_DETAIL_BY_ID_SUCCESS:
      console.log(action.payload);
      state = {
        ...state,
        userDetail: action.payload.userDetail,
        loading: false,
      };
      break;
    case userConstants.GET_USER_DETAIL_BY_ID_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
    default:
  }
  return state;
};
