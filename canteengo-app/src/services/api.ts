
import axios from 'axios';

export const API_URL = 'http://192.168.4.48:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export default api;