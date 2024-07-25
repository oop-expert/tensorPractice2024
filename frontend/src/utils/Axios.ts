import axios from 'axios';

const AxiosInstance = axios.create({
  baseURL: 'http://51.250.36.21:8000/api/',
  timeout: 30000,
  headers: {
    
  }
});

export default AxiosInstance;
