import axios from "axios";
import type { AxiosInstance } from "axios"; 

const BASE_URL = import.meta.env.VITE_API_BASE_URL as string;

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 5000,
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken"); 
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
