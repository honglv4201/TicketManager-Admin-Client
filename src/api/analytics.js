import axiosIntance from "../helpers/axios";

const AnalyticsApi = {
  getLastOrder: async () => {
    const { data } = await axiosIntance.get(`invoice/getAll`);

    return data;
  },

  getAllEnterpriseName: async () => {
    const { data } = await axiosIntance.get(`enterprise/getAllName`);

    return data;
  },

  getCurrentByEnterprisesList: async () => {
    const { data } = await axiosIntance.get(
      `user_ticket/getCurrentByEnterprisesList`
    );

    return data;
  },

  getCurrentByEnterprises: async () => {
    const data = await axiosIntance.get(`user_ticket/getCurrentByEnterprises`);

    return data;
  },

  getCurrentDate: async () => {
    const { data } = await axiosIntance.get(`user_ticket/getCurrentDate`);

    return data;
  },

  getTicketCanceled: async (date) => {
    const { data } = await axiosIntance.post(
      `user_ticket/getTicketCanceled`,
      date
    );

    return data;
  },

  getTotalTicket_Sale: async (date) => {
    const data = await axiosIntance.post(
      `wagonTicket/getTotalTicket_Sale`,
      date
    );

    return data;
  },

  getDateByMonthYear: async (date) => {
    const data = await axiosIntance.post(
      `wagonTicket/getDateByMonthYear`,
      date
    );

    return data;
  },
};

export default AnalyticsApi;
