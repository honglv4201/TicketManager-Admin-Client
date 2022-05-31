import CityApi from "../api/city";
import { cityConstants } from "./constants";

const CityAction = {
  getAllCities: () => {
    return async (dispatch) => {
      dispatch({ type: cityConstants.GET_ALL_CITIES_REQUEST });

      const res = await CityApi.getAllCities();

      if (res.status === 200) {
        const cityList = res.data;
        dispatch({
          type: cityConstants.GET_ALL_CITIES_SUCCESS,
          payload: { cities: cityList },
        });
      } else {
        dispatch({
          type: cityConstants.GET_ALL_CITIES_FAILURE,
          payload: { error: res.data.error },
        });
      }
    };
  },
};

export default CityAction;
