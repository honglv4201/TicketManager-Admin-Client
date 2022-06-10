import UserTicketApi from "../api/user_ticket";
import TicketApi from "../api/ticket";
import { userTicketConstants } from "./constants";

export const createNew = (newBook, ticket) => async (dispatch) => {
  try {
    const { data } = await UserTicketApi.createNew(newBook);

    await TicketApi.update(ticket);

    dispatch({ type: userTicketConstants.BOOK_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: userTicketConstants.BOOK_FAILURE, payload: error });
  }
};

export const update = (newBook, ticket, id) => async (dispatch) => {
  try {
    await UserTicketApi.update(newBook, id);

    await TicketApi.update(ticket);

    const { data } = await UserTicketApi.getAll();

    dispatch({ type: userTicketConstants.BOOK_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: userTicketConstants.BOOK_FAILURE, payload: error });
  }
};

export const getAll = () => async (dispatch) => {
  try {
    const { data } = await UserTicketApi.getAll();

    dispatch({ type: userTicketConstants.BOOK_GET_ALL, payload: data });
  } catch (error) {
    dispatch({ type: userTicketConstants.BOOK_FAILURE, payload: error });
  }
};
