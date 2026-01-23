import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Request interceptor - Handle dynamic headers like Language
apiClient.interceptors.request.use(
  (config) => {
    // Set Accept-Language header based on document direction
    const locale = document.documentElement.dir === "rtl" ? "ar" : "en";
    config.headers["Accept-Language"] = locale;

    return config;
  },
  (error) => Promise.reject(error),
);

// Response interceptor - Simplify data access
apiClient.interceptors.response.use(
  (response) => {
    const data = response.data;

    // If API wraps data in a standard format { code, data, message }
    if (data && typeof data === "object" && "code" in data && "data" in data) {
      if (data.code >= 400) {
        return Promise.reject(new Error(data.message || "An error occurred"));
      }
      return data.data; // Return just the nested data
    }

    return data;
  },
  (error) => {
    // Simplified error handling without redirect logic
    const message =
      error.response?.data?.message || error.message || "Network Error";
    const errors = error.response?.data?.errors || {};

    return Promise.reject({ message, errors });
  },
);

export default apiClient;
