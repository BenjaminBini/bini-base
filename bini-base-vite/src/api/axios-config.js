import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:4444/api",
  timeout: 1000,
  headers: {
    Authorization:
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhZG1pbiIsImV4cCI6MTY5MzQwMzk1Mn0.rfCPe4l2nr2b8A6jDglUEvjLUjagK0ZNkRTB9hNvY4wQCYNs5jxFzIa7myCjLPF6oJuq_YidwqRTq91RBuqDWw",
  },
});

export default axiosInstance;
