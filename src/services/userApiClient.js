import axios from "axios";

const userApiClient = axios.create({
  baseURL: "https://tuition-verse.vercel.app",
});
export default userApiClient;
