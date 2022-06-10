import axios from "../helpers/axios";

const CityApi = {
  getAllCities: async () => {
    const res = await axios.get(`city`);

    return res;
  },
};

export default CityApi;
