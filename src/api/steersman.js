import axiosIntance from "../helpers/axios";

const SteersmanApi = {
  getAllSteersman: async () => {
    const res = await axiosIntance.get(`steersman/`);

    return res;
  },

  create: async (form) => {
    const res = await axiosIntance.post(`steersman/create`, {
      ...form,
    });

    return res;
  },

  edit: async (form) => {
    const res = await axiosIntance.put(`/steersman/${form._id}`, {
      ...form,
    });

    return res;
  },
};

export default SteersmanApi;
