export type ApiResponse<T> = {
  data: T;
  error?: { message: string; code?: string };
};

export type LoginRequest = { email: string; password: string };
export type LoginResponse = {
  token: string;
  user: { id: string; email: string; role: "user" | "admin" };
};
