import { vehicleConstants } from "../actions/constants";

/* eslint-disable import/no-anonymous-default-export */
const initState = {
  vehicles: [],
  loading: false,
  error: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case vehicleConstants.GET_ALL_VEHICLES_SUCCESS:
      state = {
        ...state,
        vehicles: action.payload.vehicles,
      };
      break;
    case vehicleConstants.ADD_NEW_VEHICLE_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case vehicleConstants.ADD_NEW_VEHICLE_SUCCESS:
      state = {
        ...state,
        //vehicles: rebuildAddVEHICLE(state.VEHICLEs, action.payload.VEHICLE),
        loading: false,
      };
      break;
    case vehicleConstants.ADD_NEW_VEHICLE_FAILURE:
      state = {
        ...initState,
      };
      break;
    case vehicleConstants.EDIT_VEHICLE_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case vehicleConstants.EDIT_VEHICLE_SUCCESS:
      state = {
        ...state,
        //vehicles: rebuildEditVEHICLE(state.VEHICLEs, action.payload.VEHICLE),
        loading: false,
      };
      break;
    case vehicleConstants.EDIT_VEHICLE_FAILURE:
      state = {
        ...initState,
      };
      break;
    case vehicleConstants.DELETE_VEHICLE_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case vehicleConstants.DELETE_VEHICLE_SUCCESS:
      state = {
        ...state,
        //vehicles: rebuildDelVEHICLE(state.VEHICLEs, action.payload.id),
        loading: false,
      };
      break;
    case vehicleConstants.DELETE_VEHICLE_FAILURE:
      state = {
        ...initState,
      };
      break;
    default:
  }
  return state;
};
