import axios from "../helpers/axios";

const UserApi = {
  signup: async (user) => {
    const res = await axios.post(`/admin/signup`, {
      ...user,
    });
    return res;
  },

  getAll: async () => {
    const res = await axios.get(`user`);

    return res;
  },

  getById: async (userId) => {
    const res = await axios.get(`/user/${userId}/info`);

    return res;
  },
};

export default UserApi;
