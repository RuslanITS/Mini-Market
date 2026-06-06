import * as axios from "axios";

const axiosApi = axios.create({
  baseURL: 'https://work-8-1bbef-default-rtdb.firebaseio.com/'
});

export default axiosApi