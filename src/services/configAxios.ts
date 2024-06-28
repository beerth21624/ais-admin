import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://ais-be.tu4rl4.easypanel.host',
    });

export default axiosInstance;