import axios from "../helpers/axios";

const EnterpriseApi = {
  getAllEnterprises: async () => {
    const res = await axios.get(`/enterprise`);
    return res;
  },

  addEnterprise: async (form) => {
    const res = await axios.post(`/enterprise/`, {
      ...form,
    });

    return res;
  },

  editEnterprise: async (form) => {
    const res = await axios.put(`/enterprise/${form._id}`, {
      ...form,
    });

    return res;
  },

  deleteEnterprise: async (form) => {
    const res = await axios.delete(`/enterprise/${form._id}`);

    return res;
  },

  getEnterpriseDetailsById: async (enterpriseId) => {
    const res = await axios.get(`/enterprise/${enterpriseId}`);

    return res;
  },
};

export default EnterpriseApi;
