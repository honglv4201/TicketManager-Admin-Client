import axios from "../helpers/axios";

const TicketApi = {
  getAll: async () => {
    const res = await axios.get(`wagonTicket`);

    return res;
  },

  create: async (form) => {
    const res = await axios.post(`ticket/create`, {
      ...form,
    });

    return res;
  },

  getReport: async (form) => {
    axios.defaults.timeout = 1000000;

    const res = await axios.post(`wagonTicket/getReportEnterprises`, {
      ...form,
    });

    return res;
  },

  update: async (ticket) => {
    await axios.put(`/ticket/${ticket._id}`, ticket);
  },
};

export default TicketApi;
