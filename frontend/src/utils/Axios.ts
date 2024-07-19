import axios from 'axios';

const AxiosInstance = axios.create({
  baseURL: 'http://51.250.33.63:8000/api/',
  timeout: 10000,
  headers: {
    
  }
});

export default AxiosInstance;
