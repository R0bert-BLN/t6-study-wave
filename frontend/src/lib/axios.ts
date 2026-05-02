import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import snakecaseKeys from "snakecase-keys";
import camelcaseKeys from "camelcase-keys";
import nprogress from "nprogress";

const API_URL = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
  withXSRFToken: true,
});

let activeRequests = 0;

const startProgress = () => {
  if (activeRequests === 0) {
    nprogress.start();
  }
  activeRequests++;
};

const stopProgress = () => {
  activeRequests = Math.max(0, activeRequests - 1);

  if (activeRequests === 0) {
    nprogress.done();
  }
};

apiClient.interceptors.request.use((config) => {
  startProgress();

  if (config.data && !(config.data instanceof FormData)) {
    config.data = snakecaseKeys(config.data, { deep: true });
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => {
    stopProgress();

    if (response.data && response.headers["content-type"]?.includes("application/json")) {
      response.data = camelcaseKeys(response.data, { deep: true });
    }

    return response;
  },

  async (error: AxiosError) => {
    stopProgress();

    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 419 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await axios.get(`${API_URL}/sanctum/csrf-cookie`, {
          withCredentials: true,
        });

        return apiClient(originalRequest);
      } catch (csrfError) {
        return Promise.reject(csrfError);
      }
    }

    if (error.response?.status === 401 && window.location.pathname !== "/login") {
      window.location.href = "/login";
    }

    return Promise.reject(error);
  },
);

export default apiClient;
