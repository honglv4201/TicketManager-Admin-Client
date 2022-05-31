/* eslint-disable import/no-anonymous-default-export */
import { ticketConstants } from "../actions/constants";

const initState = {
  offlineTickets: {},
  loading: false,
  error: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case ticketConstants.ADD_NEW_OFFLINETICKET_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case ticketConstants.ADD_NEW_OFFLINETICKET_SUCCESS:
      state = {
        ...state,
        loading: false,
        offlineTicket: action.payload.offlineTicket,
      };
      break;
    case ticketConstants.ADD_NEW_OFFLINETICKET_FAILURE:
      state = {
        ...initState,
        error: action.payload.error,
      };
      break;
    case ticketConstants.GET_ALL_OFFLINETICKETS_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case ticketConstants.GET_ALL_OFFLINETICKETS_SUCCESS:
      state = {
        ...state,
        loading: false,
        offlineTickets: action.payload.offlineTickets,
      };
      break;
    case ticketConstants.GET_ALL_OFFLINETICKETS_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
      };
      break;
    default:
  }
  return state;
};
