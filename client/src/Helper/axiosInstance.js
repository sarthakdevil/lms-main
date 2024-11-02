import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://lms-main-3.onrender.com/api/v1",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;

