import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

const apiInstance = axios.create({
  baseURL: `${BASE_URL}/api`,
  withCredentials: true,
});

const userInstance = axios.create({
  baseURL: `${BASE_URL}/user`,
  withCredentials: true,
});

const communityInstance = axios.create({
  baseURL: `${BASE_URL}/community`,
  withCredentials: true,
});

export { apiInstance, userInstance, communityInstance };
