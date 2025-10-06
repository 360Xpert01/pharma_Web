import { z } from "zod";

// Login Schema Factory
export const createLoginSchema = (t: (key: string) => string) =>
  z.object({
    email: z
      .string()
      .min(1, { message: t("emailRequired") })
      .email({ message: t("emailInvalid") }),
    password: z
      .string()
      .min(1, { message: t("passwordRequired") })
      .min(6, { message: t("passwordMinLength") }),
  });

// Signup Schema Factory
export const createSignupSchema = (t: (key: string) => string) =>
  z.object({
    email: z
      .string()
      .min(1, { message: t("emailRequired") })
      .email({ message: t("emailInvalid") }),
    password: z
      .string()
      .min(1, { message: t("passwordRequired") })
      .min(6, { message: t("passwordMinLength") }),
  });

// OTP Verification Schema Factory
export const createOtpSchema = (t: (key: string) => string) =>
  z.object({
    code: z
      .string()
      .min(1, { message: t("codeRequired") })
      .min(6, { message: t("codeInvalid") })
      .max(6, { message: t("codeInvalid") }),
  });

// Forgot Password Schema Factory
export const createForgotPasswordSchema = (t: (key: string) => string) =>
  z.object({
    email: z
      .string()
      .min(1, { message: t("emailRequired") })
      .email({ message: t("emailInvalid") }),
  });

// Reset Password Schema Factory
export const createResetPasswordSchema = (t: (key: string) => string) =>
  z
    .object({
      password: z
        .string()
        .min(1, { message: t("passwordRequired") })
        .min(6, { message: t("passwordMinLength") }),
      confirmPassword: z.string().min(1, { message: t("passwordRequired") }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("passwordMismatch"),
      path: ["confirmPassword"],
    });

// Default schemas (fallback with English messages)
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const signupSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const otpSchema = z.object({
  code: z
    .string()
    .min(1, { message: "Verification code is required" })
    .min(6, { message: "Invalid verification code" })
    .max(6, { message: "Invalid verification code" }),
});

export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Please enter a valid email address" }),
});

export const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z.string().min(1, { message: "Password is required" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Enhanced Login Schema with remember me option
export const enhancedLoginSchema = loginSchema.extend({
  rememberMe: z.boolean().optional(),
});

// Enhanced Signup Schema with terms acceptance
export const enhancedSignupSchema = signupSchema.extend({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
});

// Change Password Schema (for authenticated users)
export const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

// Email Verification Schema
export const emailVerificationSchema = z.object({
  token: z.string().min(1, "Verification token is required"),
});

// Two-Factor Authentication Setup Schema
export const twoFactorSetupSchema = z.object({
  secret: z.string().min(1, "Secret is required"),
  token: z
    .string()
    .min(6, "Token must be at least 6 characters")
    .max(6, "Token must be exactly 6 characters"),
});

// Export type inferences for use in components
export type LoginFormValues = z.infer<typeof loginSchema>;
export type SignupFormValues = z.infer<typeof signupSchema>;
export type OtpFormValues = z.infer<typeof otpSchema>;
export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;
export type EnhancedLoginFormValues = z.infer<typeof enhancedLoginSchema>;
export type EnhancedSignupFormValues = z.infer<typeof enhancedSignupSchema>;
export type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;
export type EmailVerificationFormValues = z.infer<typeof emailVerificationSchema>;
export type TwoFactorSetupFormValues = z.infer<typeof twoFactorSetupSchema>;
