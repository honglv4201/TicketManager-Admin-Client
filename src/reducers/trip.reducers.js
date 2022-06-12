/* eslint-disable import/no-anonymous-default-export */
import { tripConstants } from "../actions/constants";

const initState = {
  trips: [],
  loading: false,
  error: null,
  tripDetails: {},
};

const rebuildAddTrip = (trips, trip) => {
  let mytrips = [];
  for (let veh of trips) {
    mytrips.push(veh);
  }
  mytrips.push(trip);
  return mytrips;
};

export default (state = initState, action) => {
  switch (action.type) {
    case tripConstants.GET_ALL_TRIP_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case tripConstants.GET_ALL_TRIP_SUCCESS:
      state = {
        ...state,
        trips: action.payload.trips,
        loading: false,
      };
      break;
    case tripConstants.GET_ALL_TRIP_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
      };
      break;
    case tripConstants.ADD_NEW_TRIP_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case tripConstants.ADD_NEW_TRIP_SUCCESS:
      state = {
        ...state,
        trips: rebuildAddTrip(state.trips, action.payload.trip),
        loading: false,
      };
      break;
    case tripConstants.ADD_NEW_TRIP_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
      };
      break;
    case tripConstants.GET_TRIP_DETAILS_BY_ID_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case tripConstants.GET_TRIP_DETAILS_BY_ID_SUCCESS:
      state = {
        ...state,
        tripDetails: action.payload.tripDetails,
        loading: false,
      };
      break;
    case tripConstants.GET_TRIP_DETAILS_BY_ID_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
      };
    case tripConstants.GET_TRIP_DETAILS_BY_ID_LOCATION_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case tripConstants.GET_TRIP_DETAILS_BY_ID_LOCATION_SUCCESS:
      state = {
        ...state,
        tripDetails: action.payload.tripDetails,
        loading: false,
      };
      break;
    case tripConstants.GET_TRIP_DETAILS_BY_ID_LOCATION_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.error,
        tripDetails: {},
      };
      break;
    default:
  }
  return state;
};
