import { API_CONFIG, type ApiResponse } from "./config";

class AuthAPI {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.message || "An error occurred",
        };
      }

      return {
        success: true,
        data,
        message: data.message,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Network error occurred",
      };
    }
  }

  async login(credentials: { email: string; password: string }) {
    return this.request(API_CONFIG.ENDPOINTS.AUTH.LOGIN, {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  }

  async signup(userData: { email: string; password: string; name?: string }) {
    return this.request(API_CONFIG.ENDPOINTS.AUTH.SIGNUP, {
      method: "POST",
      body: JSON.stringify(userData),
    });
  }

  async verifyOtp(data: { email: string; otp: string }) {
    return this.request(API_CONFIG.ENDPOINTS.AUTH.VERIFY_OTP, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async forgotPassword(email: string) {
    return this.request(API_CONFIG.ENDPOINTS.AUTH.FORGOT_PASSWORD, {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  }

  async resetPassword(data: { token: string; password: string }) {
    return this.request(API_CONFIG.ENDPOINTS.AUTH.RESET_PASSWORD, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async refreshToken(token: string) {
    return this.request(API_CONFIG.ENDPOINTS.AUTH.REFRESH_TOKEN, {
      method: "POST",
      body: JSON.stringify({ token }),
    });
  }
}

export const authAPI = new AuthAPI();
