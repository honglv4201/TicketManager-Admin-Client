import { wagonTicketConstants } from "../actions/constants";

/* eslint-disable import/no-anonymous-default-export */
const initState = {
  wagons: [],
  loading: false,
  error: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case wagonTicketConstants.ADD_NEW_WAGON_TICKET_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case wagonTicketConstants.ADD_NEW_WAGON_TICKET_SUCCESS:
      state = {
        ...state,
        //vehicles: rebuildAddVEHICLE(state.VEHICLEs, action.payload.VEHICLE),
        loading: false,
      };
      break;
    case wagonTicketConstants.ADD_NEW_WAGON_TICKET_FAILURE:
      state = {
        ...initState,
      };
      break;
    case wagonTicketConstants.EDIT_WAGON_TICKET_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case wagonTicketConstants.EDIT_WAGON_TICKET_SUCCESS:
      state = {
        ...state,
        //vehicles: rebuildEditVEHICLE(state.VEHICLEs, action.payload.VEHICLE),
        loading: false,
      };
      break;
    case wagonTicketConstants.EDIT_WAGON_TICKET_FAILURE:
      state = {
        ...initState,
      };
      break;
    default:
  }
  return state;
};
