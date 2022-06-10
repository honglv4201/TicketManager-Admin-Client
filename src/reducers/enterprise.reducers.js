/* eslint-disable import/no-anonymous-default-export */
import { enterpriseConstants } from "../actions/constants";

const initState = {
  enterprises: [],
  loading: false,
  error: null,
  enterpriseDetails: {},
};

const rebuildAddEnterprises = (enterprises, enterprise) => {
  let myEnterprises = [];
  for (let ent of enterprises) {
    myEnterprises.push(ent);
  }
  myEnterprises.push(enterprise);

  return myEnterprises;
};

const rebuildEditEnterprises = (enterprises, enterprise) => {
  let myEnterprises = [];
  for (let ent of enterprises) {
    myEnterprises.push(ent._id === enterprise._id ? enterprise : ent);
  }

  return myEnterprises;
};

const rebuildDelEnterprises = (enterprises, id) => {
  let myEnterprises = [];
  for (let ent of enterprises) {
    if (ent._id !== id) {
      myEnterprises.push(ent);
    }
  }

  return myEnterprises;
};

export default (state = initState, action) => {
  switch (action.type) {
    case enterpriseConstants.GET_ALL_ENTERPRISES_SUCCESS:
      state = {
        ...state,
        enterprises: action.payload.enterprises,
      };
      break;
    case enterpriseConstants.ADD_NEW_ENTERPRISES_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case enterpriseConstants.ADD_NEW_ENTERPRISES_SUCCESS:
      state = {
        ...state,
        enterprises: rebuildAddEnterprises(
          state.enterprises,
          action.payload.enterprise
        ),
        loading: false,
      };
      break;
    case enterpriseConstants.ADD_NEW_ENTERPRISES_FAILURE:
      state = {
        ...initState,
      };
      break;
    case enterpriseConstants.EDIT_ENTERPRIESE_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case enterpriseConstants.EDIT_ENTERPRIESE_SUCCESS:
      state = {
        ...state,
        enterprises: rebuildEditEnterprises(
          state.enterprises,
          action.payload.enterprise
        ),
        loading: false,
      };
      break;
    case enterpriseConstants.EDIT_ENTERPRIESE_FAILURE:
      state = {
        ...initState,
      };
      break;
    case enterpriseConstants.DELETE_ENTERPRIESE_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case enterpriseConstants.DELETE_ENTERPRIESE_SUCCESS:
      state = {
        ...state,
        enterprises: rebuildDelEnterprises(
          state.enterprises,
          action.payload.id
        ),
        loading: false,
      };
      break;
    case enterpriseConstants.DELETE_ENTERPRIESE_FAILURE:
      state = {
        ...initState,
      };
      break;
    case enterpriseConstants.GET_ENTERPRISES_DETAILS_BY_ID_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case enterpriseConstants.GET_ENTERPRISES_DETAILS_BY_ID_SUCCESS:
      state = {
        ...state,
        enterpriseDetails: action.payload.enterpriseDetails,
        loading: false,
      };
      break;
    case enterpriseConstants.GET_ENTERPRISES_DETAILS_BY_ID_FAILURE:
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
