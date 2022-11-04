import axios from 'axios';

const authApi = axios.create({
  baseURL: 'http://localhost:3000/api/',
});

const trackerAPI = axios.create({
  baseURL: 'http://localhost:3000/api/tracker',
});

trackerAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwtToken');
  if (token) {
    config.headers = { authorization: `Bearer ${token}` };
  }
  return config;
});

export { authApi, trackerAPI };
