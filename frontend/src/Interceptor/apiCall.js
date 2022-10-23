import axios from "axios";
import { url } from "../baseUrl";

const axiosInstance = axios.create({
  baseURL: url,
  timeout: 5000,
  headers: {
    Authorization: localStorage.getItem("access_token")
      ? "Bearer " + localStorage.getItem("access_token")
      : null,
    "Content-Type": "application/json",
    accept: "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    

    if (error.response.status === 401) {
      const refreshToken = localStorage.getItem("refresh_token");

      if (refreshToken) {
        try {
          const response = await axiosInstance.post("/auth/token", {
            token: refreshToken,
          });
          localStorage.setItem("access_token", response.data.access_token);

          axiosInstance.defaults.headers["Authorization"] =
            "Bearer " + response.data.access_token;
          originalRequest.headers["Authorization"] =
            "Bearer " + response.data.access_token;
          return await axiosInstance(originalRequest);
        } catch (err) {
          console.log(err);
        }
      }
    }

    return Promise.reject(error);
  }
);

export const api = axiosInstance;
