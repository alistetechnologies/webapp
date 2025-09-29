import Axios from 'axios';
import toast from 'react-hot-toast';

function authRequestInterceptor(config) {
  if (config.headers) {
    config.headers.Accept = 'application/json';
  }

  config.withCredentials = true;
  return config;
}

export const api = Axios.create();

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.error ||
      error?.message;
    toast.error(message);
    return Promise.reject(error);
  }
);

export default api;