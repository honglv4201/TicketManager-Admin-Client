import axiosIntance from "../helpers/axios";

const baseUrl = `user_ticket`;

const UserTicketApi = {
  createNew: async (bookTicket) => {
    axiosIntance.post(baseUrl, bookTicket);
  },

  getAll: async () => {
    axiosIntance.get(baseUrl);
  },

  update: async (bookTicket, id) => {
    axiosIntance.put(`${baseUrl}/${id}`, bookTicket);
  },
};

export default UserTicketApi;
