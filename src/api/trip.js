import axios from "../helpers/axios";

const TripApi = {
  create: async (form) => {
    const res = await axios.post(`trip/create`, {
      ...form,
    });
    return res;
  },

  edit: async (form) => {
    const res = await axios.put(`/trip/${form._id}`, {
      ...form,
    });

    return res;
  },

  getDetailsById: async (tripId) => {
    const res = await axios.get(`/trip/${tripId}/informations`);

    return res;
  },

  getAll: async () => {
    const res = await axios.get(`/trip`);
  },

  getDetailsByIdLocation: async (tripId, startIndex, endIndex) => {
    const res = await axios.post(`/trip/${tripId}/informations`, {
      startIndex,
      endIndex,
    });
    console.log(
      "🚀 ~ file: trip.js ~ line 29 ~ getDetailsByIdLocation: ~ res",
      res
    );

    return res;
  },
};

export default TripApi;
