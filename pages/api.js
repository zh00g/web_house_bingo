import axios from "axios";

const api = axios.create({
  baseURL: 'http://192.168.1.67:5000'
});

export default api;
