import RouteApi from "../api/route";
import { routerConstants } from "./constants";

const RouteAction = {
  getAllRoutes: () => {
    return async (dispatch) => {
      dispatch({ type: routerConstants.GET_ALL_ROUTES_REQUEST });

      const res = await RouteApi.getAll();

      if (res.status === 200) {
        const routeList = res.data;
        dispatch({
          type: routerConstants.GET_ALL_ROUTES_SUCCESS,
          payload: { routes: routeList },
        });
      } else {
        dispatch({
          type: routerConstants.GET_ALL_ROUTES_FAILURE,
          payload: { error: res.data.error },
        });
      }
    };
  },

  addRoute: (form) => {
    return async (dispatch) => {
      dispatch({ type: routerConstants.ADD_NEW_ROUTE_REQUEST });

      const res = await RouteApi.create(form);

      if (res.status === 200) {
        dispatch({
          type: routerConstants.ADD_NEW_ROUTE_SUCCESS,
          payload: { route: res.data },
        });
      } else {
        dispatch({
          type: routerConstants.ADD_NEW_ROUTE_FAILURE,
          payload: { error: res.data.error },
        });
      }
    };
  },

  editRoute: (form) => {
    return async (dispatch) => {
      dispatch({ type: routerConstants.EDIT_ROUTE_REQUEST });

      const res = await RouteApi.update(form);

      if (res.status === 200) {
        dispatch({
          type: routerConstants.EDIT_ROUTE_SUCCESS,
          payload: { route: res.data },
        });
      } else {
        dispatch({
          type: routerConstants.EDIT_ROUTE_FAILURE,
          payload: { error: res.data.error },
        });
      }
    };
  },

  deleteRoute: (form) => {
    return async (dispatch) => {
      dispatch({ type: routerConstants.DELETE_ROUTE_REQUEST });

      const res = await RouteApi.delete(form);

      if (res.status === 200) {
        dispatch({
          type: routerConstants.DELETE_ROUTE_SUCCESS,
          payload: { id: form._id },
        });
      } else {
        dispatch({
          type: routerConstants.DELETE_ROUTE_FAILURE,
          payload: { error: res.data.error },
        });
      }
    };
  },

  getRouteDetailssById: (payload) => {
    return async (dispatch) => {
      dispatch({
        type: routerConstants.GET_ROUTES_DETAILS_BY_ID_REQUEST,
      });

      const { routeId } = payload.params;

      const res = await RouteApi.getRouteDetailssById(routeId);

      try {
        if (res.status === 200) {
          dispatch({
            type: routerConstants.GET_ROUTES_DETAILS_BY_ID_SUCCESS,
            payload: { routeDetails: res.data },
          });
        }
      } catch (error) {
        dispatch({
          type: routerConstants.GET_ROUTES_DETAILS_BY_ID_FAILURE,
          payload: { error: res.data.error },
        });
      }
    };
  },
};

export default RouteAction;
