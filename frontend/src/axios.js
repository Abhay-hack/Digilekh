import axios from 'axios';
// import axiosCookieJarSupport from 'axios-cookiejar-support';
// import tough from 'tough-cookie';

// const jar = new tough.CookieJar();

// // Enhance Axios to support cookies
// axiosCookieJarSupport(axios);

const apiInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
});

const userInstance = axios.create({
  baseURL: 'http://localhost:5000/user',
  withCredentials: true,
});

export { apiInstance, userInstance };
