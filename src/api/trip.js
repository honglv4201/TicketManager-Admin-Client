import axios from "../helpers/axios";

const TripApi = {
  create: async (form) => {
    const res = await axios.post(`trip/create`, {
      ...form,
    });
    return res;
  },

  edit: async (form) => {
    await axios.put(`/trip/${form._id}`, {
      ...form,
    });
  },

  getDetailsById: async (tripId) => {
    const res = await axios.get(`/trip/${tripId}/informations`);

    return res;
  },
};

export default TripApi;
