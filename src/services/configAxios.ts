import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { showAlertGlobal, hideAlertGlobal } from "../contexts/AlertContext";

// Constants
const BASE_URL: string =
  process.env.NODE_ENV === "production"
    ? "https://ais-be.tu4rl4.easypanel.host"
    : "http://localhost:8080";

const TIMEOUT = 10000;

// Types
interface DecodedToken {
  exp: number;
  [key: string]: string | number | boolean; // allows for other properties, but with specific types
}

// Initialization
const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
});

// Helper Functions
const isTokenExpired = (token: string): boolean => {
  if (!token) return true;
  try {
    const payload = token.split(".")[1];
    const decodedToken: DecodedToken = JSON.parse(atob(payload));
    return decodedToken.exp < Date.now() / 1000;
  } catch (error) {
    console.error("Error decoding token:", error);
    return true; // If we can't decode the token, assume it's expired
  }
};

const handleTokenExpiration = async (): Promise<void> => {
  showAlertGlobal("error", "หมดเวลาการใช้งาน กรุณาเข้าสู่ระบบอีกครั้ง");
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  setTimeout(() => {
    hideAlertGlobal();
    window.location.reload();
  }, 3000);
};

// Interceptors
axiosInstance.interceptors.request.use(
  async (
    config: InternalAxiosRequestConfig
  ): Promise<InternalAxiosRequestConfig> => {
    const token = localStorage.getItem("token");
    if (token && isTokenExpired(token)) {
      console.log("Token expired");
      await handleTokenExpiration();
      return Promise.reject(new Error("Token expired"));
    }

    if (token) {
      config.headers = config.headers || {};
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    showAlertGlobal("loading", "กำลังโหลด...");
    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    console.log("Error request", error);
    hideAlertGlobal();
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    hideAlertGlobal();
    return response;
  },
  (error: AxiosError): Promise<AxiosError> => {
    hideAlertGlobal();
    if (error.response?.status === 401) {
      console.log("Unauthorized access. Redirecting to login...");
      handleTokenExpiration();
    } else {
      showAlertGlobal("error", error.message || "An error occurred");
    }
    return Promise.reject(error);
  }
);

// Exported Functions
export const showError = (message: string): void => {
  showAlertGlobal("error", message);
};

export const showSuccess = (message: string): void => {
  showAlertGlobal("success", message);
};

export default axiosInstance;
