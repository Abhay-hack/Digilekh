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
  headers: { 'Content-Type': 'application/json' },
});

// Add interceptor to always attach latest token
communityInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { apiInstance, userInstance, communityInstance };
