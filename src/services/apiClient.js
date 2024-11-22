import axios from 'axios';
import Cookies from 'js-cookie';

// Crear cliente Axios
const apiClient = axios.create({
    baseURL: 'http://localhost:8081/',
    timeout: 1000, 
    headers: {
        'Content-Type': 'application/json',
    },
});

apiClient.interceptors.request.use((config) => {
    const token = Cookies.get('authToken'); 
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

export default apiClient;
