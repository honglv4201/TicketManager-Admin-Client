import axios from "../helpers/axios";

const wagonTicketApi = {
  create: async (form) => {
    const res = await axios.post(`wagonTicket/create`, {
      ...form,
    });
    return res;
  },
};

export default wagonTicketApi;
