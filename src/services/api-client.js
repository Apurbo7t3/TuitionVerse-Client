import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://tuition-verse.vercel.app/api",
});
export default apiClient;
