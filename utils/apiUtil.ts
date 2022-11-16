import axios from 'axios';

const authAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AUTH_API_BASE_URL,
});

const trackerAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_TRACKER_API_BASE_URL,
});

trackerAPI.interceptors.request.use((config) => {
  const token = localStorage.getItem('jwtToken');
  if (token) {
    config.headers = { authorization: `Bearer ${token}` };
  }
  return config;
});

export { authAPI, trackerAPI };
