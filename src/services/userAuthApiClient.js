import axios from "axios";

const userAuthApiClient = axios.create({
  baseURL: "http://127.0.0.1:8000",
});

userAuthApiClient.interceptors.request.use(
  (config) => {
    const token = JSON.parse(localStorage.getItem("authTokens")).access;
    if (token) {
      config.headers.Authorization = `JWT ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

export default userAuthApiClient;
