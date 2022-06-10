import { userTicketConstants } from "../actions/constants";

export default (userTicket = [], action) => {
  switch (action.type) {
    case userTicketConstants.BOOK_SUCCESS:
      return [...userTicket, action.payload];
    case userTicketConstants.BOOK_GET_ALL:
      return action.payload;
    case userTicketConstants.BOOK_FAILURE:
      return action.payload;
    default:
      return userTicket;
  }
};
