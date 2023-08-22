import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4444",
  timeout: 1000,
});

axiosInstance.interceptors.request.use((config) => {
  // set bearer token in header if present in local storage
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = token;
  } else {
    //delete config.headers.Authorization;
  }
  return config;
});

// TODO : manage gracefully API errors

export default axiosInstance;
