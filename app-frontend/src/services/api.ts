import axios from 'axios';

const api = axios.create({
  baseURL: 'https://backendfelas.netlify.app/api', 
});

export default api;
