import axios from 'axios';
import { getSessionIdFromCookie, ensureSessionCookie } from '@/utils/session';
import type { AxiosRequestHeaders } from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    // 세션 쿠키 보장 및 세션 ID 헤더 부착
    const sid = getSessionIdFromCookie() || ensureSessionCookie();
    const headers: AxiosRequestHeaders = (config.headers || {}) as AxiosRequestHeaders;
    headers['X-Session-Id'] = sid;
    config.headers = headers;
    return config;
  },
  (error) => Promise.reject(error),
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    return Promise.reject(error);
  },
);

export default axiosInstance;
