import Cookies from "js-cookie";

const TOKEN_KEY = "auth_token";
const TOKEN_EXPIRY_DAYS = 7;

export const setToken = (token: string): void => {
  Cookies.set(TOKEN_KEY, token, {
    expires: TOKEN_EXPIRY_DAYS,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
};

export const getToken = (): string | null => {
  return Cookies.get(TOKEN_KEY) || null;
};

export const removeToken = (): void => {
  Cookies.remove(TOKEN_KEY);
};
