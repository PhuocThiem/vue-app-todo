import axios from 'axios';
import { API_BASE_URL } from '../config/api';

axios.defaults.baseURL = API_BASE_URL;

axios.defaults.timeout = 30000;

axios.interceptors.request.use(config => config, error => Promise.reject(error));

axios.interceptors.response.use(
  response => {
    console.log('inside interceptors', response);
    return response;
  },
  error => Promise.reject(error.response || error.request || error.message),
);

const http = {
  request(config = {}) {
    return axios.request(config);
  },
  get(url, config = {}) {
    return axios.get(url, config);
  },
  post(url, data = {}, config = {}) {
    return axios.post(url, data, config);
  },
  put(url, data = {}, config = {}) {
    return axios.put(url, data, config);
  },
  patch(url, data = {}, config = {}) {
    return axios.patch(url, data, config);
  },
  delete(url, config = {}) {
    return axios.delete(url, config);
  },
};

export default http;
