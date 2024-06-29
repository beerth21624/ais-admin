import axios, { AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const BASE_URL: string = process.env.NODE_ENV === 'production' ? 'https://ais-be.tu4rl4.easypanel.host' : 'http://localhost:8080';

const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
});

interface DecodedToken {
  exp: number;
  [key: string]: any;
}

const handleTokenExpiration = async (): Promise<void> => {
    await MySwal.fire({
        icon: 'warning',
        title: 'หมดเวลาการใช้งาน',
        text: 'กรุณาเข้าสู่ระบบอีกครั้ง',
        confirmButtonText: 'ตกลง',
        willClose: () => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.reload();
        }
    });
};

const isTokenExpired = (token: string): boolean => {
  if (!token) return true;
  const decodedToken: DecodedToken = JSON.parse(atob(token.split('.')[1]));
  return decodedToken.exp < Date.now() / 1000;
};

axiosInstance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
    const token = localStorage.getItem('token');
    if (token && isTokenExpired(token)) {
      console.log("Token expired");
      await handleTokenExpiration();
return Promise.reject(new Error('Token expired'));

    }
    
    if (token) {
      config.headers = config.headers || {};
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    openLoading(); 
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    console.log("Error request", error);
    closeLoading(); 
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    closeLoading(); // Close loading indicator when response is received
    return response;
  },
  (error: AxiosError): Promise<AxiosError> => {
    closeLoading(); // Close loading indicator if response fails
    if (error.response && error.response.status === 401) {
      console.log('Unauthorized access. Redirecting to login...');
      handleTokenExpiration();
    }
    return Promise.reject(error);
  }
);

export const openLoading = (message: string = 'กำลังโหลด...'): void => {
  MySwal.fire({
    title: message,
    didOpen: () => {
      MySwal.showLoading();
    },
    allowOutsideClick: false,
    allowEscapeKey: false,
    showConfirmButton: false,
  });
};

export const closeLoading = (): void => {
  MySwal.close();
};

export const showError = (message: string): void => {
  MySwal.fire({
    icon: 'error',
    title: 'เกิดข้อผิดพลาด!',
    text: message,
  });
};

export const showSuccess = (message: string): void => {
  MySwal.fire({
    icon: 'success',
    title: 'สำเร็จ!',
    text: message,
  });
};

export default axiosInstance;
