// services/authService.ts
import axios, { type AxiosInstance } from "axios";

// Base API configuration
const API_BASE_URL =
  (globalThis as any)["process"]?.env?.REACT_APP_API_URL ||
  "http://localhost:3000/gms-core";

// Create axios instance with default config
const apiClient: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // 10 seconds
});

// Request interceptor to add auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for token refresh

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Wait for the token to refresh
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return apiClient(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        console.log(refreshToken, "Refreshing token...");
        
        if (!refreshToken) throw new Error("No refresh token found");
        console.log(refreshToken, "Using refresh token");

        // Request new access token using refresh token
        const response = await axios.post(
          `${API_BASE_URL}/users/refresh-token`,
          {
            refreshToken,
          }
        );

        const { accessToken, refreshToken: newRefreshToken } = response.data;

        // ✅ Save new tokens
        localStorage.setItem("token", accessToken);
        if (newRefreshToken) {
          localStorage.setItem("refreshToken", newRefreshToken);
        }

        // ✅ Update default headers
        apiClient.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;

        processQueue(null, accessToken);
        isRefreshing = false;

        // ✅ Retry the original request with new token
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError, null);
        isRefreshing = false;

        // ❌ Refresh failed → logout
        localStorage.clear();
        window.location.href = "/";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Types
export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  username: string;
  role: string;
  accessToken: string;
  refreshToken: string;
}

export interface ApiError {
  message: string;
  missingFields?: string[];
  statusCode?: number;
}

// Auth Service
class AuthService {
  /**
   * Login user
   */

  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await apiClient.post<LoginResponse>(
        "/users/login",
        credentials
      );

      const data = response.data;
      console.log("Login Response:", data);

      // ✅ Save tokens and user info in localStorage
      if (data.accessToken && data.refreshToken) {
        localStorage.setItem("token", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
      }

      if (data.id) localStorage.setItem("userId", data.id.toString());
      if (data.username) localStorage.setItem("username", data.username);
      if (data.role) localStorage.setItem("role", data.role);

      return data;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  /**
   * Logout user
   */
  logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    window.location.href = "/";
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    const token = localStorage.getItem("token");
    return !!token;
  }

  /**
   * Get current user info from localStorage
   */
  getCurrentUser() {
    return {
      id: localStorage.getItem("userId"),
      username: localStorage.getItem("username"),
      role: localStorage.getItem("role"),
    };
  }

  /**
   * Handle API errors
   */
  private handleError(error: any): ApiError {
    if (error.response) {
      // Server responded with error
      const status = error.response.status;
      const errorData = error.response.data;

      if (status === 400) {
        return {
          message: errorData.message || "Validation failed",
          missingFields: errorData.missingFields,
          statusCode: 400,
        };
      } else if (status === 401) {
        return {
          message: "Invalid username or password",
          statusCode: 401,
        };
      } else if (status === 500) {
        return {
          message: "Server error. Please try again later",
          statusCode: 500,
        };
      }

      return {
        message: errorData.message || "An unexpected error occurred",
        statusCode: status,
      };
    } else if (error.request) {
      return {
        message: "Cannot connect to server. Please check your connection",
        statusCode: 0,
      };
    }

    return {
      message: error.message || "An error occurred",
      statusCode: 0,
    };
  }
}

export const authService = new AuthService();
export { apiClient };
