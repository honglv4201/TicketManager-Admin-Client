/* eslint-disable import/no-anonymous-default-export */

import { cityConstants } from "../actions/constants";

const initState = {
  cities: [],
  loading: false,
  error: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case cityConstants.GET_ALL_CITIES_SUCCESS:
      state = {
        ...state,
        cities: action.payload.cities,
      };
      break;
    default:
  }
  return state;
};
