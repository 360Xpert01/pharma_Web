export type ApiResponse<T> = {
  data: T;
  error?: { message: string; code?: string };
};

export type LoginRequest = { email: string; password: string };
export type LoginResponse = {
  token: string;
  user: { id: string; email: string; role: "user" | "admin" };
};

// OpenAPI snippet (documentation-only):
// paths:
//   /auth/login:
//     post:
//       requestBody:
//         content:
//           application/json:
//             schema: { $ref: "#/components/schemas/LoginRequest" }
//       responses:
//         "200":
//           content:
//             application/json:
//               schema: { $ref: "#/components/schemas/LoginResponse" }
