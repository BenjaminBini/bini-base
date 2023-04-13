import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4444",
  timeout: 1000,
  headers: { Authorization: "Basic YWRtaW46cGFzc3dvcmQ" },
});
const fetcher = (url) => instance.get(url).then((res) => res.data);

export default fetcher;
