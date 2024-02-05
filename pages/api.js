import axios from "axios";

const api = axios.create({
  baseURL: 'https://192.168.0.227:5000'
});

export default api;
