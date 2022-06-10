import { ticketConstants } from "../actions/constants";

/* eslint-disable import/no-anonymous-default-export */
const initState = {
  tickets: [],
  report: [],
  loading: false,
  error: null,
};

const rebuildAddTicket = (list, add) => {
  let mylist = [];
  for (let l of list) {
    mylist.push(l);
  }
  mylist.push(add);
  return mylist;
};

export default (state = initState, action) => {
  switch (action.type) {
    case ticketConstants.GET_ALL_TICKETS_SUCCESS:
      state = {
        ...state,
        tickets: action.payload.tickets,
      };
      break;
    case ticketConstants.ADD_NEW_TICKET_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case ticketConstants.ADD_NEW_TICKET_SUCCESS:
      state = {
        ...state,
        tickets: rebuildAddTicket(state.tickets, action.payload.ticket),
        loading: false,
      };
      break;
    case ticketConstants.ADD_NEW_TICKET_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
      };
      break;
    case "GETREPORT":
      state = {
        ...state,
        report: action.payload.report,
      };
      break;
    default:
  }
  return state;
};
