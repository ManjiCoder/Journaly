import axios from 'axios';

export const axiosClient = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
  baseURL: 'http://localhost:3000/api',
  timeout: 10000,
});
