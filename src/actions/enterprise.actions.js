import { enterpriseConstants } from "./constants";
import EnterpriseApi from "../api/enterprise";

const EnterpriseAction = {
  getAllEnterprises: () => {
    return async (dispatch) => {
      dispatch({ type: enterpriseConstants.GET_ALL_ENTERPRISES_REQUEST });

      const res = await EnterpriseApi.getAllEnterprises();

      if (res.status === 200) {
        const enterpriseList = res.data;
        dispatch({
          type: enterpriseConstants.GET_ALL_ENTERPRISES_SUCCESS,
          payload: { enterprises: enterpriseList },
        });
      } else {
        dispatch({
          type: enterpriseConstants.GET_ALL_ENTERPRISES_FAILURE,
          payload: { error: res.data.error },
        });
      }
    };
  },

  addEnterprise: (form) => {
    return async (dispatch) => {
      dispatch({ type: enterpriseConstants.ADD_NEW_ENTERPRISES_REQUEST });

      const res = await EnterpriseApi.addEnterprise(form);

      if (res.status === 200) {
        dispatch({
          type: enterpriseConstants.ADD_NEW_ENTERPRISES_SUCCESS,
          payload: { enterprise: res.data },
        });
      } else {
        dispatch({
          type: enterpriseConstants.ADD_NEW_ENTERPRISES_FAILURE,
          payload: { error: res.data.error },
        });
      }
    };
  },

  editEnterprise: (form) => {
    return async (dispatch) => {
      dispatch({ type: enterpriseConstants.EDIT_ENTERPRIESE_REQUEST });

      const res = await EnterpriseApi.editEnterprise(form);

      if (res.status === 200) {
        dispatch({
          type: enterpriseConstants.EDIT_ENTERPRIESE_SUCCESS,
          payload: { enterprise: res.data },
        });
      } else {
        dispatch({
          type: enterpriseConstants.EDIT_ENTERPRIESE_FAILURE,
          payload: { error: res.data.error },
        });
      }
    };
  },

  deleteEnterprise: (form) => {
    return async (dispatch) => {
      dispatch({ type: enterpriseConstants.DELETE_ENTERPRIESE_REQUEST });

      const res = await EnterpriseApi.deleteEnterprise(form);

      if (res.status === 200) {
        dispatch({
          type: enterpriseConstants.DELETE_ENTERPRIESE_SUCCESS,
          payload: { id: form._id },
        });
      } else {
        dispatch({
          type: enterpriseConstants.DELETE_ENTERPRIESE_FAILURE,
          payload: { error: res.data.error },
        });
      }
    };
  },

  getEnterpriseDetailsById: (payload) => {
    return async (dispatch) => {
      dispatch({
        type: enterpriseConstants.GET_ENTERPRISES_DETAILS_BY_ID_REQUEST,
      });

      const { enterpriseId } = payload.params;
      const res = await EnterpriseApi.getEnterpriseDetailsById(enterpriseId);
      try {
        if (res.status === 200) {
          dispatch({
            type: enterpriseConstants.GET_ENTERPRISES_DETAILS_BY_ID_SUCCESS,
            payload: { enterpriseDetails: res.data },
          });
        }
      } catch (error) {
        dispatch({
          type: enterpriseConstants.GET_ENTERPRISES_DETAILS_BY_ID_FAILURE,
          payload: { error: res.data.error },
        });
      }
    };
  },
};

export default EnterpriseAction;
