import axios from 'axios';

const AxiosInstance = axios.create({
  baseURL: 'http://tensorpractic.ru/api/',
  timeout: 10000,
  headers: {
    
  }
});

export default AxiosInstance;
