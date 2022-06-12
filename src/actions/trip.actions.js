import TripApi from "../api/trip";
import { tripConstants } from "./constants";
import TicketAction from "./ticket.actions";
import wagonTicketAction from "./wagonTicket.action";

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

      const res = await TripApi.edit(form);

      if (res.status === 200) {
        dispatch(wagonTicketAction.editWagonTicket(form));

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

  getAllTrip: (payload) => {
    return async (dispatch) => {
      dispatch({
        type: tripConstants.GET_ALL_TRIP_REQUEST,
      });

      const res = await TripApi.getAll();

      try {
        if (res.status === 200) {
          dispatch({
            type: tripConstants.GET_ALL_TRIP_SUCCESS,
            payload: { trips: res.data },
          });
        }
      } catch (error) {
        dispatch({
          type: tripConstants.GET_ALL_TRIP_FAILURE,
          payload: { error: res.data.error },
        });
      }
    };
  },

  getTripDetailsByIdAndLocation: (payload) => {
    console.log("sdasdasdsafdsaf");
    return async (dispatch) => {
      dispatch({
        type: tripConstants.GET_TRIP_DETAILS_BY_ID_LOCATION_REQUEST,
      });
      const { startIndex, endIndex, tripId } = payload;
      const res = await TripApi.getDetailsByIdLocation(
        tripId,
        startIndex,
        endIndex
      );
      try {
        if (res.status === 200) {
          if (!res.data.success) {
            dispatch({
              type: tripConstants.GET_TRIP_DETAILS_BY_ID_LOCATION_FAILURE,
              payload: { error: res.data.message },
            });
          } else {
            dispatch({
              type: tripConstants.GET_TRIP_DETAILS_BY_ID_LOCATION_SUCCESS,
              payload: { tripDetails: res.data },
            });
          }
        } else {
        }
      } catch (error) {
        dispatch({
          type: tripConstants.GET_TRIP_DETAILS_BY_ID_LOCATION_FAILURE,
          payload: { error: error },
        });
      }
    };
  },
};

export default TripAction;
