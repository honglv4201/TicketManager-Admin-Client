import axios from "../helpers/axios";

const wagonTicketApi = {
  create: async (form) => {
    const res = await axios.post(`wagonTicket/createAllWagons`, {
      ...form,
    });
    return res;
  },

  update: async (form) => {
    const res = await axios.put(`/wagonTicket/update`, {
      ...form,
    });

    return res;
  },
};

export default wagonTicketApi;
