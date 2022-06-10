import { steersmanConstants } from "../actions/constants";

/* eslint-disable import/no-anonymous-default-export */
const initState = {
  steersmans: [],
  loading: false,
  error: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case steersmanConstants.GET_ALL_STEERSMAN_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case steersmanConstants.GET_ALL_STEERSMAN_SUCCESS:
      state = {
        ...state,
        loading: false,
        steersmans: action.payload.steersmans,
      };
      break;
    case steersmanConstants.GET_ALL_STEERSMAN_FAILURE:
      state = {
        ...initState,
      };
      break;
    case steersmanConstants.ADD_NEW_STEERSMAN_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case steersmanConstants.ADD_NEW_STEERSMAN_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case steersmanConstants.ADD_NEW_STEERSMAN_FAILURE:
      state = {
        ...initState,
      };
      break;
    case steersmanConstants.EDIT_STEERSMAN_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case steersmanConstants.EDIT_STEERSMAN_SUCCESS:
      state = {
        ...state,
        //STEERSMANs: rebuildEditSTEERSMAN(state.STEERSMANs, action.payload.STEERSMAN),
        loading: false,
      };
      break;
    case steersmanConstants.EDIT_STEERSMAN_FAILURE:
      state = {
        ...initState,
      };
      break;
    default:
  }
  return state;
};
