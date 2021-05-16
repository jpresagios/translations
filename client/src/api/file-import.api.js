import axios from "axios";

const uploadFile = async file => {
  try {
    const resp = await axios.post(`${process.env.VUE_APP_API_URL}import`, file);
    return resp;
  } catch (error) {
    throw error;
  }
};

export default { uploadFile };
