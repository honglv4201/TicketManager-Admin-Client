import UserApi from "../api/user";
import { userConstants } from "./constants";

const UserAction = {
  signup: (user) => {
    return async (dispatch) => {
      dispatch({ type: userConstants.USER_REGISTER_REQUEST });

      const res = await UserApi.signup();

      if (res.status === 201) {
        const { message } = res.data;
        dispatch({
          type: userConstants.USER_REGISTER_SUCCESS,
          payload: { message },
        });
      } else {
        dispatch({
          type: userConstants.USER_REGISTER_FAILURE,
          payload: { error: res.data.error },
        });
      }
    };
  },

  getAllUser: () => {
    return async (dispatch) => {
      dispatch({ type: userConstants.GET_ALL_USERS_REQUEST });

      const res = await UserApi.getAll();

      if (res.status === 200) {
        const userList = res.data;
        dispatch({
          type: userConstants.GET_ALL_USERS_SUCCESS,
          payload: { users: userList },
        });
      } else {
        dispatch({
          type: userConstants.GET_ALL_USERS_FAILURE,
          payload: { error: res.data.error },
        });
      }
    };
  },

  getUserDetailById: (payload) => {
    return async (dispatch) => {
      dispatch({
        type: userConstants.GET_USER_DETAIL_BY_ID_REQUEST,
      });

      const { userId } = payload.params;

      const res = await UserApi.getById(userId);

      try {
        if (res.status === 200) {
          dispatch({
            type: userConstants.GET_USER_DETAIL_BY_ID_SUCCESS,
            payload: { userDetail: res.data },
          });
        }
      } catch (error) {
        dispatch({
          type: userConstants.GET_USER_DETAIL_BY_ID_FAILURE,
          payload: { error: res.data.error },
        });
      }
    };
  },
};

export default UserAction;
