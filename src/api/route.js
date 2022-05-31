import axios from "../helpers/axios";

const RouteApi = {
  getAll: async () => {
    const res = await axios.get(`route`);

    return res;
  },

  create: async (form) => {
    const res = await axios.post(`route/create`, {
      ...form,
    });

    return res;
  },

  update: async (form) => {
    const res = await axios.put(`/route/${form._id}`, {
      ...form,
    });

    return res;
  },

  delete: async (form) => {
    const res = await axios.delete(`/route/${form._id}`);

    return res;
  },

  getRouteDetailssById: async (routeId) => {
    const res = await axios.get(`/route/${routeId}/informations`);

    return res;
  },
};

export default RouteApi;
