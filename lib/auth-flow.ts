import type { AuthFlowData, AuthSession } from "@/app/[locale]/auth/types";
import type { User } from "@/types/user";

const AUTH_FLOW_COOKIE = "auth_flow";
const FLOW_EXPIRY_TIME = 10 * 60 * 1000; // 10 minutes

// Simple cookie utility functions
const setCookie = (name: string, value: string, minutes: number) => {
  const date = new Date();
  date.setTime(date.getTime() + minutes * 60 * 1000);
  const expires = `expires=${date.toUTCString()}`;
  const secure = process.env.NODE_ENV === "production" ? "; Secure" : "";
  document.cookie = `${name}=${value}; ${expires}; path=/; SameSite=Strict${secure}`;
};

const getCookie = (name: string): string | null => {
  if (typeof document === "undefined") return null;
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

const deleteCookie = (name: string) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/`;
};

export class AuthFlowManager {
  static setFlow(data: Omit<AuthFlowData, "timestamp">): void {
    const flowData: AuthFlowData = {
      ...data,
      timestamp: Date.now(),
    };

    setCookie(AUTH_FLOW_COOKIE, JSON.stringify(flowData), 10); // 10 minutes
  }

  static getFlow(): AuthFlowData | null {
    const flowCookie = getCookie(AUTH_FLOW_COOKIE);
    if (!flowCookie) return null;

    try {
      const flowData: AuthFlowData = JSON.parse(flowCookie);

      // Check if flow has expired
      if (Date.now() - flowData.timestamp > FLOW_EXPIRY_TIME) {
        this.clearFlow();
        return null;
      }

      return flowData;
    } catch {
      this.clearFlow();
      return null;
    }
  }

  static clearFlow(): void {
    deleteCookie(AUTH_FLOW_COOKIE);
  }

  static canAccessOtp(): boolean {
    const flow = this.getFlow();
    return flow?.step === "awaiting-otp";
  }

  static canAccessReset(): boolean {
    const flow = this.getFlow();
    return flow?.step === "reset-password" && !!flow.resetToken;
  }

  static canAccessForgot(): boolean {
    // Forgot password is always accessible from login
    return true;
  }
}

// Auth session management
export const setAuthSession = (token: string, user: User) => {
  setCookie("user_logged_in", "true", 7 * 24 * 60); // 7 days in minutes
  setCookie("auth_token", token, 7 * 24 * 60); // 7 days in minutes

  // Set user data cookies for consistency across admin/user contexts
  setCookie("user_email", user.email, 7 * 24 * 60);
  setCookie("user_id", user.id, 7 * 24 * 60);
  if (user.name) setCookie("user_name", user.name, 7 * 24 * 60);
  if (user.avatar) setCookie("user_avatar", user.avatar, 7 * 24 * 60);
  setCookie("user_role", user.role, 7 * 24 * 60);

  AuthFlowManager.clearFlow();
};

export const clearAuthSession = () => {
  deleteCookie("user_logged_in");
  deleteCookie("auth_token");

  // Clear user data cookies
  deleteCookie("user_email");
  deleteCookie("user_name");
  deleteCookie("user_avatar");
  deleteCookie("user_id");
  deleteCookie("user_role");

  AuthFlowManager.clearFlow();
};

export const isAuthenticated = (): boolean => {
  return !!getCookie("user_logged_in");
};
