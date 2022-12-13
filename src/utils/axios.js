import axios from "axios";

// ----------------------------------------------------------------------
const axiosConfig = {
  baseURL: "http://localhost:8080",
};
const axiosInstance = axios.create(axiosConfig);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(error?.response?.data?.error || "Something went wrong!")
);

export default axiosInstance;
