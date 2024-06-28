import axios from 'axios';

const axiosInstance = axios.create({
    // baseURL: 'https://ais-be.tu4rl4.easypanel.host',
        baseURL: 'http://localhost:8080',
  
    
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response.status === 401) {
            console.log('Unauthorized access. Redirecting to login...')
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;