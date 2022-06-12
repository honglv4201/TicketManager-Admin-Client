import wagonTicketApi from "../api/wagonTicket.js";
import { wagonTicketConstants } from "./constants.js";

const wagonTicketAction = {
  addWagonTicket: (form) => {
    return async (dispatch) => {
      var newForm = {
        idTrip: form._id,
        price: form.price,
      };
      dispatch({ type: wagonTicketConstants.ADD_NEW_WAGON_TICKET_REQUEST });
      const res = await wagonTicketApi.create(newForm);
      if (res.status === 200) {
        dispatch({
          type: wagonTicketConstants.ADD_NEW_WAGON_TICKET_SUCCESS,
          payload: { wagon: res.data },
        });
      } else {
        dispatch({
          type: wagonTicketConstants.ADD_NEW_WAGON_TICKET_FAILURE,
          payload: { error: res.data.error },
        });
      }
    };
  },

  editWagonTicket: (form) => {
    return async (dispatch) => {
      try {
        const newForm = { ...form, idTrip: form._id };

        dispatch({ type: wagonTicketConstants.EDIT_WAGON_TICKET_REQUEST });

        const res = await wagonTicketApi.update(newForm);

        if (res.status === 200) {
          dispatch({
            type: wagonTicketConstants.EDIT_WAGON_TICKET_SUCCESS,
            payload: { wagon: res.data },
          });
        } else {
          dispatch({
            type: wagonTicketConstants.EDIT_WAGON_TICKET_FAILURE,
            payload: { error: res.data.error },
          });
        }
      } catch (err) {
        console.log(err);
      }
    };
  },
};

export default wagonTicketAction;
