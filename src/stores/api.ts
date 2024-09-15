import axios from 'axios';

// Create a new instance of Axios with custom configurations
const api = axios.create({
  baseURL: 'https://notesphere-sys-production.up.railway.app:3000',
  timeout: 5000,
});

export default api;
