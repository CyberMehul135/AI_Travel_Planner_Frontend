import axios from "axios";
import { triggerLogout } from "../features/auth/context/AuthContext";

export const authAxios = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

authAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (!error.config.url.includes("/auth/session")) {
        triggerLogout();
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  },
);
