import axios from "../helpers/axios";

const VehicleApi = {
  getAll: async () => {
    const res = await axios.get(`vehicle`);

    return res;
  },

  create: async (form) => {
    const res = await axios.post(`vehicle/create`, {
      ...form,
    });

    return res;
  },

  update: async (form) => {
    const res = await axios.put(`/vehicle/${form._id}`, {
      ...form,
    });

    return res;
  },

  delete: async (form) => {
    const res = await axios.delete(`/vehicle/${form._id}`);

    return res;
  },
};

export default VehicleApi;
