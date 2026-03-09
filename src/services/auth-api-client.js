import axios from "axios";

const authApiClient = axios.create({
  baseURL: "https://tuition-verse.vercel.app/api",
});

authApiClient.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("authTokens")).access;
    if (token) {
      config.headers.Authorization = `JWT ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default authApiClient;
