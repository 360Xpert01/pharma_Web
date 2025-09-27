import axios from "axios";

const baseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL || "http://localhost:4000";

export const api = axios.create({
  baseURL,
  withCredentials: true,
});

let authToken: string | null = null;

export function setAuthToken(token: string | null) {
  authToken = token;
}

api.interceptors.request.use((config) => {
  if (authToken) {
    config.headers = { ...config.headers, Authorization: `Bearer ${authToken}` };
  }
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    // Example: redirect on 401
    if (err?.response?.status === 401) {
      // location.href = "/auth/login"
    }
    return Promise.reject(err);
  }
);
