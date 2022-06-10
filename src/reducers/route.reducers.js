/* eslint-disable import/no-anonymous-default-export */
import { routerConstants } from "../actions/constants";

const initState = {
  routes: [],
  loading: false,
  error: null,
  routeDetails: {},
};

const rebuildAddRoute = (routes, route) => {
  let myRoutes = [];
  for (let rou of routes) {
    myRoutes.push(rou);
  }
  myRoutes.push(route);

  return myRoutes;
};

const rebuildEditRoute = (routes, route) => {
  let myRoutes = [];
  for (let rou of routes) {
    myRoutes.push(rou._id === route._id ? route : rou);
  }

  return myRoutes;
};

const rebuildDelRoute = (routes, id) => {
  let myRoutes = [];
  for (let rou of routes) {
    if (rou._id !== id) {
      myRoutes.push(rou);
    }
  }
  return myRoutes;
};

export default (state = initState, action) => {
  switch (action.type) {
    case routerConstants.GET_ALL_ROUTES_SUCCESS:
      state = {
        ...state,
        routes: action.payload.routes,
      };
      break;
    case routerConstants.ADD_NEW_ROUTE_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case routerConstants.ADD_NEW_ROUTE_SUCCESS:
      state = {
        ...state,
        routes: rebuildAddRoute(state.routes, action.payload.route),
        loading: false,
      };
      break;
    case routerConstants.ADD_NEW_ROUTE_FAILURE:
      state = {
        ...initState,
      };
      break;
    case routerConstants.EDIT_ROUTE_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case routerConstants.EDIT_ROUTE_SUCCESS:
      state = {
        ...state,
        routes: rebuildEditRoute(state.routes, action.payload.route),
        loading: false,
      };
      break;
    case routerConstants.EDIT_ROUTE_FAILURE:
      state = {
        ...initState,
      };
      break;
    case routerConstants.DELETE_ROUTE_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case routerConstants.DELETE_ROUTE_SUCCESS:
      state = {
        ...state,
        routes: rebuildDelRoute(state.routes, action.payload.id),
        loading: false,
      };
      break;
    case routerConstants.DELETE_ROUTE_FAILURE:
      state = {
        ...initState,
      };
      break;
    case routerConstants.GET_ROUTES_DETAILS_BY_ID_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case routerConstants.GET_ROUTES_DETAILS_BY_ID_SUCCESS:
      state = {
        ...state,
        routeDetails: action.payload.routeDetails,
        loading: false,
      };
      break;
    case routerConstants.GET_ROUTES_DETAILS_BY_ID_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
      break;
    default:
  }
  return state;
};
