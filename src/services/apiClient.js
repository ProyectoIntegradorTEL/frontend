import axios from 'axios';
import Cookies from 'js-cookie';

const apiClient = axios.create({
    baseURL: 'http://localhost:8082', // Reemplaza con tu URL base
    timeout: 1000, // Establece el tiempo de espera en milisegundos
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + Cookies.get('authToken'), // Añade el token de autenticación a todas las peticiones
    }
});

export default apiClient;
