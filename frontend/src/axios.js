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
  headers: {
    Authorization: `Bearer ${localStorage.getItem('authToken')}`, // adjust key as needed
    'Content-Type': 'application/json',
  },
});


export { apiInstance, userInstance, communityInstance };
