import axios from 'axios';
import {Alert} from 'react-native';
import {BASE_URL} from '../config/endpoint';

const axiosClient = axios.create({
  baseURL: BASE_URL,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.response.use(
  response => response,
  error => {
    Alert.alert('Error', error.message);
  },
);

export default axiosClient;
