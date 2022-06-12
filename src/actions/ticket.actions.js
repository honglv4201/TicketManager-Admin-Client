import TicketApi from "../api/ticket";
import { ticketConstants } from "./constants";
import wagonTicketAction from "./wagonTicket.action";

const TicketAction = {
  getAllTickets: () => {
    return async (dispatch) => {
      dispatch({ type: ticketConstants.GET_ALL_TICKETS_REQUEST });

      const res = await TicketApi.getAll();

      if (res.status === 200) {
        const ticketList = res.data;
        dispatch({
          type: ticketConstants.GET_ALL_TICKETS_SUCCESS,
          payload: { tickets: ticketList },
        });
      } else {
        dispatch({
          type: ticketConstants.GET_ALL_TICKETS_FAILURE,
          payload: { error: res.data.error },
        });
      }
    };
  },

  addTicketOfTrip: (form) => {
    return async (dispatch) => {
      var newForm = { idTrip: form._id };

      dispatch({ type: ticketConstants.ADD_NEW_TICKET_REQUEST });

      const res = await TicketApi.create(newForm);

      if (res.status === 200) {
        dispatch(
          wagonTicketAction.addWagonTicket({
            ...form,
            price: form.fixed_price,
          })
        );

        dispatch({
          type: ticketConstants.ADD_NEW_TICKET_SUCCESS,
          payload: { ticket: res.data },
        });
      } else {
        dispatch({
          type: ticketConstants.ADD_NEW_TICKET_FAILURE,
          payload: { error: res.data.error },
        });
      }
    };
  },

  getReport: (form) => {
    return async (dispatch) => {
      const res = await TicketApi.getReport(form);

      dispatch({ type: "GETREPORT", payload: { report: res.data } });
    };
  },
};

export default TicketAction;
