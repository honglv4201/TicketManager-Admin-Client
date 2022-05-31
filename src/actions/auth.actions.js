import { authConstants } from "./constants";
import { notification } from "antd";
import "antd/dist/antd.css";
import AuthApi from "../api/auth";

const AuthAction = {
  login: (user) => {
    return async (dispatch) => {
      dispatch({ type: authConstants.LOGIN_REQUEST });

      try {
        const res = await AuthApi.login(user);

        if (res.status === 200) {
          const { token, myUser } = res.data;
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(myUser));
          dispatch({
            type: authConstants.LOGIN_SUCCESS,
            payload: {
              token,
              user,
            },
          });
        }
      } catch (error) {
        notification.error({
          message: "Lỗi",
          description: "Sai tên đăng nhập hoặc mật khẩu",
        });
        dispatch({
          type: authConstants.LOGIN_FAILURE,
          payload: { error: error },
        });
      }
    };
    //     .then((res) => {
    //       if (res.status === 200) {
    //         const { token, user } = res.data;
    //         localStorage.setItem("token", token);
    //         localStorage.setItem("user", JSON.stringify(user));
    //         dispatch({
    //           type: authConstants.LOGIN_SUCCESS,
    //           payload: {
    //             token,
    //             user,
    //           },
    //         });
    //       }
    //     })
    //     .catch((error) => {
    //       notification.error({
    //         message: "Lỗi",
    //         description: "Sai tên đăng nhập hoặc mật khẩu",
    //       });
    //       dispatch({
    //         type: authConstants.LOGIN_FAILURE,
    //         payload: { error: error },
    //       });
    //     });
    //   if (res.status === 200) {
    //     const { token, user } = res.data;
    //     localStorage.setItem("token", token);
    //     localStorage.setItem("user", JSON.stringify(user));
    //     dispatch({
    //       type: authConstants.LOGIN_SUCCESS,
    //       payload: {
    //         token,
    //         user,
    //       },
    //     });
    //   } else {
    //     if (res.status === 400) {
    //       dispatch({
    //         type: authConstants.LOGIN_FAILURE,
    //         payload: { error: res.data.error },
    //       });
    //     }
    //   }
    // };
  },

  isUserLoggedIn: () => {
    return async (dispatch) => {
      const token = localStorage.getItem("token");

      if (token) {
        const user = JSON.parse(localStorage.getItem("user"));

        dispatch({
          type: authConstants.LOGIN_SUCCESS,
          payload: {
            token,
            user,
          },
        });
      } else {
        dispatch({
          type: authConstants.LOGIN_FAILURE,
          payload: { error: "Failed to login" },
        });
      }
    };
  },

  signout: () => {
    return async (dispatch) => {
      dispatch({ type: authConstants.LOGOUT_REQUEST });

      const res = await AuthApi.signout();

      if (res.status === 200) {
        localStorage.clear();
        dispatch({
          type: authConstants.LOGOUT_SUCCESS,
        });
      } else {
        dispatch({
          type: authConstants.LOGOUT_FAILURE,
          payload: { error: res.data.error },
        });
      }
    };
  },
};

export default AuthAction;
