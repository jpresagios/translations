import axios from "axios";

const search = async criteria => {
  try {
    const resp = await axios.get(`${process.env.VUE_APP_API_URL}translate?criteria=${criteria}`);
    return resp.data;
  } catch (error) {
    throw error;
  }
};

export default { search };
