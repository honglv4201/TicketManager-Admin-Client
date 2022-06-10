import OfflineTicketApi from "../api/offlineTicket";
import { ticketConstants } from "./constants";

const OfflineTicketAction = {
  addOfflineTicket: (form, ticket) => {
    return async (dispatch) => {
      dispatch({ type: ticketConstants.ADD_NEW_OFFLINETICKET_REQUEST });

      const res = await OfflineTicketApi.create(form);

      await OfflineTicketApi.update(ticket);

      if (res.status === 200) {
        dispatch({
          type: ticketConstants.ADD_NEW_OFFLINETICKET_SUCCESS,
          payload: { offlineTicket: res.data },
        });
      } else {
        dispatch({
          type: ticketConstants.ADD_NEW_OFFLINETICKET_FAILURE,
          payload: { error: res.data.error },
        });
      }
    };
  },

  getAllOfflineTicket: () => {
    return async (dispatch) => {
      dispatch({ type: ticketConstants.GET_ALL_OFFLINETICKETS_REQUEST });

      try {
        const res = await OfflineTicketApi.getAll();

        if (res.status === 200) {
          const offlineTicketList = res.data;

          dispatch({
            type: ticketConstants.GET_ALL_OFFLINETICKETS_SUCCESS,
            payload: { offlineTickets: offlineTicketList },
          });
        }
      } catch (error) {
        console.log(error);
        dispatch({
          type: ticketConstants.GET_ALL_OFFLINETICKETS_FAILURE,
          payload: { error: error },
        });
      }
    };
  },
};

export default OfflineTicketAction;
