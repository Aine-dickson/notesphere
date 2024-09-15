import axios from 'axios';

// Create a new instance of Axios with custom configurations
const api = axios.create({
  baseURL: 'https://notesphere-sys-production.up.railway.app/',
  timeout: 10000,
  // withCredentials: true
});

export default api;
