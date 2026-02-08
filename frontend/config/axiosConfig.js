// axiosConfig.js
import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'https://api.w3programmer.net/api' : 'http://127.0.0.1:8000/api',
 // baseURL: process.env.NODE_ENV === 'production' ? 'https://api.w3programmer.net/api' : 'https://api.w3programmer.net/api',
});

export default instance;
