// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001', // ✅ Change this if your backend runs on a different port
});

export default api;
