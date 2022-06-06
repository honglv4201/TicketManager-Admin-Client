import { analyticsConstants } from "../actions/constants";

const initState = {
  currentDateData: null,
  loading: false,
  error: false,
};

export const lastOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case analyticsConstants.LAST_ORDER_REQUEST:
      return { loading: true };
    case analyticsConstants.LAST_ORDER_SUCCESS:
      return {
        listOrder: action.payload,
        loading: false,
      };
    case analyticsConstants.LAST_ORDER_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const analyticsReducer = (state = {}, action) => {
  switch (action.type) {
    case analyticsConstants.ANALYTICS_REQUEST:
      return { loading: true };
    case analyticsConstants.ANALYTICS_SUCCESS:
      return {
        totalTicket: action.payload.totalTicket,
        totalSale: action.payload.totalSale,
        totalCanceledTicket: action.payload.totalCanceledTicket,
        totalNewUser: action.payload.totalNewUser,
        loading: false,
      };
    case analyticsConstants.ANALYTICS_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const analyticsChartReducer = (state = {}, action) => {
  switch (action.type) {
    case analyticsConstants.ANALYTICS_CHART_REQUEST:
      return { loading: true };
    case analyticsConstants.ANALYTICS_CHART_SUCCESS:
      return {
        listTicket: action.payload.listTicket,
        listSale: action.payload.listSale,
        loading: false,
      };
    case analyticsConstants.ANALYTICS_CHART_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const newUserReducer = (state = {}, action) => {
  switch (action.type) {
    case analyticsConstants.NEW_USER_REQUEST:
      return { loading: true };
    case analyticsConstants.NEW_USER_SUCCESS:
      return {
        loading: false,
        listNewUser: action.payload,
      };
    case analyticsConstants.NEW_USER_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const ticketDonutReducer = (state = {}, action) => {
  switch (action.type) {
    case analyticsConstants.TICKET_DONUT_REQUEST:
      return { loading: true };
    case analyticsConstants.TICKET_DONUT_SUCCESS:
      return {
        donutData: action.payload,
        loading: false,
      };
    case analyticsConstants.TICKET_DONUT_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const currentDateReducer = (state = initState, action) => {
  switch (action.type) {
    case analyticsConstants.CURRENT_DATE_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case analyticsConstants.CURRENT_DATE_SUCCESS:
      state = {
        ...state,
        currentDateData: action.payload,
        loading: false,
      };
      break;
    case analyticsConstants.CURRENT_DATE_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload,
      };
      break;
    default:
  }
  return state;
};

export const chartByEnterprisesReducer = (state = {}, action) => {
  switch (action.type) {
    case analyticsConstants.CHART_ENTERPRISE_REQUEST:
      return { loading: true };
    case analyticsConstants.CHART_ENTERPRISE_SUCCESS:
      return {
        booking: action.payload.booking,
        sale: action.payload.sale,
        loading: false,
      };
    case analyticsConstants.CHART_ENTERPRISE_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const listByEnterprisesReducer = (state = {}, action) => {
  switch (action.type) {
    case analyticsConstants.LIST_ENTERPRISE_REQUEST:
      return { loading: true };
    case analyticsConstants.LIST_ENTERPRISE_SUCCESS:
      return {
        listEnterprises: action.payload,
        loading: false,
      };
    case analyticsConstants.LIST_ENTERPRISE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const nameChartByEnterprisesReducer = (state = {}, action) => {
  switch (action.type) {
    case analyticsConstants.NAME_CHART_ENTERPRISE_REQUEST:
      return { loading: true };
    case analyticsConstants.NAME_CHART_ENTERPRISE_SUCCESS:
      return {
        listName: action.payload,
        loading: false,
      };
    case analyticsConstants.NAME_CHART_ENTERPRISE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
