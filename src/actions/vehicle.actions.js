import VehicleApi from "../api/vehicle";
import { vehicleConstants } from "./constants";

const VehicleAction = {
  getAllVehicles: () => {
    return async (dispatch) => {
      dispatch({ type: vehicleConstants.GET_ALL_VEHICLES_REQUEST });

      const res = await VehicleApi.getAll();

      if (res.status === 200) {
        const vehicleList = res.data;
        dispatch({
          type: vehicleConstants.GET_ALL_VEHICLES_SUCCESS,
          payload: { vehicles: vehicleList },
        });
      } else {
        dispatch({
          type: vehicleConstants.GET_ALL_VEHICLES_FAILURE,
          payload: { errorl: res.data.error },
        });
      }
    };
  },

  addVehicle: (form) => {
    return async (dispatch) => {
      dispatch({ type: vehicleConstants.ADD_NEW_VEHICLE_REQUEST });

      const res = await VehicleApi.create(form);

      if (res.status === 200) {
        dispatch({
          type: vehicleConstants.ADD_NEW_VEHICLE_SUCCESS,
          payload: { vehicle: res.data },
        });
      } else {
        dispatch({
          type: vehicleConstants.ADD_NEW_VEHICLE_FAILURE,
          payload: { error: res.data.error },
        });
      }
    };
  },

  editVehicle: (form) => {
    return async (dispatch) => {
      try {
        dispatch({ type: vehicleConstants.EDIT_VEHICLE_REQUEST });

        const res = await VehicleApi.update(form);

        if (res.status === 200) {
          dispatch({
            type: vehicleConstants.EDIT_VEHICLE_SUCCESS,
            payload: { vehicle: res.data },
          });
        } else {
          dispatch({
            type: vehicleConstants.EDIT_VEHICLE_FAILURE,
            payload: { error: res.data.error },
          });
        }
      } catch (err) {
        console.log(err);
      }
    };
  },

  deleteVehicle: (form) => {
    return async (dispatch) => {
      dispatch({ type: vehicleConstants.DELETE_VEHICLE_REQUEST });

      const res = await VehicleApi.delete(form);

      if (res.status === 200) {
        dispatch({
          type: vehicleConstants.DELETE_VEHICLE_SUCCESS,
          payload: { id: form._id },
        });
      } else {
        dispatch({
          type: vehicleConstants.DELETE_VEHICLE_FAILURE,
          payload: { error: res.data.error },
        });
      }
    };
  },
};

export default VehicleAction;
