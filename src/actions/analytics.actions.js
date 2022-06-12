import AnalyticsApi from "../api/analytics";
import axios from "../helpers/axios";
import { analyticsConstants } from "./constants";

const AnalyticsAction = {
  getLastOrder: () => {
    return async (dispatch) => {
      try {
        dispatch({ type: analyticsConstants.LAST_ORDER_REQUEST });

        const data = await AnalyticsApi.getLastOrder();

        dispatch({
          type: analyticsConstants.LAST_ORDER_SUCCESS,
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: analyticsConstants.LAST_ORDER_FAILURE,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    };
  },

  getLastOrderByDay: () => {
    return async (dispatch) => {
      try {
        dispatch({ type: analyticsConstants.LAST_ORDER_REQUEST });

        const data = await AnalyticsApi.getLastOrderByDay();

        dispatch({
          type: analyticsConstants.LAST_ORDER_SUCCESS,
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: analyticsConstants.LAST_ORDER_FAILURE,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    };
  },

  getAllName: () => {
    return async (dispatch) => {
      try {
        dispatch({ type: analyticsConstants.LIST_ENTERPRISE_REQUEST });

        const data = await AnalyticsApi.getAllEnterpriseName();

        dispatch({
          type: analyticsConstants.NAME_CHART_ENTERPRISE_SUCCESS,
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: analyticsConstants.NAME_CHART_ENTERPRISE_FAILURE,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    };
  },

  getCurrentByEnterprisesList: () => {
    return async (dispatch) => {
      try {
        dispatch({ type: analyticsConstants.LIST_ENTERPRISE_REQUEST });

        const data = await AnalyticsApi.getCurrentByEnterprisesList();

        dispatch({
          type: analyticsConstants.LIST_ENTERPRISE_SUCCESS,
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: analyticsConstants.LIST_ENTERPRISE_FAILURE,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    };
  },

  getCurrentByEnterprises: () => {
    return async (dispatch) => {
      try {
        dispatch({ type: analyticsConstants.CHART_ENTERPRISE_REQUEST });

        const data = await AnalyticsApi.getCurrentByEnterprises();

        const { booking, sale } = data.data;

        dispatch({
          type: analyticsConstants.CHART_ENTERPRISE_SUCCESS,
          payload: {
            booking,
            sale,
          },
        });
      } catch (error) {
        dispatch({
          type: analyticsConstants.CHART_ENTERPRISE_FAILURE,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    };
  },

  getCurrentDate: () => {
    return async (dispatch) => {
      try {
        dispatch({ type: analyticsConstants.CURRENT_DATE_REQUEST });

        const data = await AnalyticsApi.getCurrentDate();

        dispatch({
          type: analyticsConstants.CURRENT_DATE_SUCCESS,
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: analyticsConstants.CURRENT_DATE_FAILURE,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    };
  },

  getTicketCanceled: (date) => async (dispatch) => {
    try {
      dispatch({ type: analyticsConstants.TICKET_DONUT_REQUEST });

      const data = await AnalyticsApi.getTicketCanceled(date);

      // const { totalCanceledTicket } = data.data;
      // dispatch({
      //     type: analyticsConstants.TICKET_DONUT_SUCCESS,
      //     payload: {
      //         totalCanceledTicket
      //     }
      // })

      dispatch({
        type: analyticsConstants.TICKET_DONUT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: analyticsConstants.TICKET_DONUT_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  },

  getTotalTicket_Sale: (date) => async (dispatch) => {
    try {
      dispatch({ type: analyticsConstants.ANALYTICS_REQUEST });

      const data = await AnalyticsApi.getTotalTicket_Sale(date);

      const { totalTicket, totalSale, totalNewUser, totalCanceledTicket } =
        data.data;

      dispatch({
        type: analyticsConstants.ANALYTICS_SUCCESS,
        payload: {
          totalTicket,
          totalSale,
          totalNewUser,
          totalCanceledTicket,
        },
      });
    } catch (error) {
      dispatch({
        type: analyticsConstants.ANALYTICS_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  },

  getDateByMonthYear: (date) => async (dispatch) => {
    try {
      dispatch({ type: analyticsConstants.ANALYTICS_CHART_REQUEST });
      const data = await AnalyticsApi.getDateByMonthYear(date);

      const { listTicket, listSale } = data.data;
      dispatch({
        type: analyticsConstants.ANALYTICS_CHART_SUCCESS,
        payload: {
          listTicket,
          listSale,
        },
      });
    } catch (error) {
      dispatch({
        type: analyticsConstants.ANALYTICS_CHART_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  },

  getNewUser: (date) => async (dispatch) => {
    try {
      dispatch({ type: analyticsConstants.NEW_USER_REQUEST });
      const { data } = await axios.post(`/getNewUser`, date);

      dispatch({ type: analyticsConstants.NEW_USER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: analyticsConstants.NEW_USER_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  },
};

export default AnalyticsAction;
