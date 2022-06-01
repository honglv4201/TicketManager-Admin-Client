import TripApi from "../api/trip";
import { tripConstants } from "./constants";
import TicketAction from "./ticket.actions";

const TripAction = {
  addTrip: (form) => {
    return async (dispatch) => {
      dispatch({ type: tripConstants.ADD_NEW_TRIP_REQUEST });

      const res = await TripApi.create(form);

      if (res.status === 200) {
        dispatch(TicketAction.addTicketOfTrip({ ...form, _id: res.data._id }));

        dispatch({
          type: tripConstants.ADD_NEW_TRIP_SUCCESS,
          payload: { trip: res.data },
        });
      } else {
        dispatch({
          type: tripConstants.ADD_NEW_TRIP_FAILURE,
          payload: { error: res.data.error },
        });
      }
    };
  },

  editTrip: (form) => {
    return async (dispatch) => {
      dispatch({ type: tripConstants.EDIT_TRIP_REQUEST });

      console.log(form);

      const res = await TripApi.edit(form);

      if (res.status === 200) {
        dispatch({
          type: tripConstants.EDIT_TRIP_SUCCESS,
          payload: { trip: res.data },
        });
      } else {
        dispatch({
          type: tripConstants.EDIT_TRIP_FAILURE,
          payload: { error: res.data.error },
        });
      }
    };
  },

  getTripDetailsById: (payload) => {
    return async (dispatch) => {
      dispatch({
        type: tripConstants.GET_TRIP_DETAILS_BY_ID_REQUEST,
      });

      const { tripId } = payload.params;

      const res = await TripApi.getDetailsById(tripId);

      try {
        if (res.status === 200) {
          dispatch({
            type: tripConstants.GET_TRIP_DETAILS_BY_ID_SUCCESS,
            payload: { tripDetails: res.data },
          });
        }
      } catch (error) {
        dispatch({
          type: tripConstants.GET_TRIP_DETAILS_BY_ID_FAILURE,
          payload: { error: res.data.error },
        });
      }
    };
  },
};

export default TripAction;
