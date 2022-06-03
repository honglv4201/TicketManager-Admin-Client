import axios from "../helpers/axios";

const wagonTicketApi = {
  create: async (form) => {
    const res = await axios.post(`wagonTicket/createAllWagons`, {
      ...form,
    });
    return res;
  },
};

export default wagonTicketApi;
