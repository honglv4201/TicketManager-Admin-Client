import axios from "../helpers/axios";

const OfflineTicketApi = {
  create: async (form) => {
    const res = await axios.post(`offline_phone_ticket/create`, {
      ...form,
    });

    return res;
  },

  update: async (ticket) => {
    await axios.put(`ticket/${ticket._id}`, ticket);
  },

  getAll: async () => {
    const res = await axios.get(`offline_phone_ticket`);

    return res;
  },
};

export default OfflineTicketApi;
