import SteersmanApi from "../api/steersman";
import { steersmanConstants } from "./constants";

const SteersmanAction = {
  getAllSteersman: () => {
    return async (dispatch) => {
      dispatch({ type: steersmanConstants.GET_ALL_STEERSMAN_REQUEST });

      const res = await SteersmanApi.getAllSteersman();

      if (res.status === 200) {
        const steersmansList = res.data;
        dispatch({
          type: steersmanConstants.GET_ALL_STEERSMAN_SUCCESS,
          payload: { steersmans: steersmansList },
        });
      } else {
        dispatch({
          type: steersmanConstants.GET_ALL_STEERSMAN_FAILURE,
          payload: { error: res.data.error },
        });
      }
    };
  },

  addSteersman: (form) => {
    return async (dispatch) => {
      dispatch({ type: steersmanConstants.ADD_NEW_STEERSMAN_REQUEST });

      const res = await SteersmanApi.create(form);

      if (res.status === 200) {
        dispatch({
          type: steersmanConstants.ADD_NEW_STEERSMAN_SUCCESS,
          payload: { steersman: res.data },
        });
      } else {
        dispatch({
          type: steersmanConstants.ADD_NEW_STEERSMAN_FAILURE,
          payload: { error: res.data.error },
        });
      }
    };
  },

  editSteersman: (form) => {
    return async (dispatch) => {
      dispatch({ type: steersmanConstants.EDIT_STEERSMAN_REQUEST });

      const res = await SteersmanApi.edit(form);

      if (res.status === 200) {
        dispatch({
          type: steersmanConstants.EDIT_STEERSMAN_SUCCESS,
          payload: { steersman: res.data },
        });
      } else {
        dispatch({
          type: steersmanConstants.EDIT_STEERSMAN_FAILURE,
          payload: { error: res.data.error },
        });
      }
    };
  },
};

export default SteersmanAction;
