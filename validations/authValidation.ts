import { z } from "zod";
const translate =
  (t?: (key: string) => string) =>
  (key: string, fallback: string): string =>
    t ? t(key) : fallback;

const emailField = (t?: (key: string) => string) =>
  z
    .string()
    .min(1, { message: translate(t)("emailRequired", "Email is required") })
    .email({ message: translate(t)("emailInvalid", "Please enter a valid email") });

const passwordField = (t?: (key: string) => string) =>
  z
    .string()
    .min(1, { message: translate(t)("passwordRequired", "Password is required") })
    .min(6, {
      message: translate(t)("passwordMinLength", "Password must be at least 6 characters"),
    });
export const createLoginSchema = (t?: (key: string) => string) =>
  z.object({
    email: emailField(t),
    password: passwordField(t),
  });

export const createSignupSchema = (t?: (key: string) => string) =>
  z.object({
    email: emailField(t),
    password: passwordField(t),
    firstName: z
      .string()
      .min(2, {
        message: translate(t)("firstNameMin", "First name must be at least 2 characters"),
      }),
    lastName: z
      .string()
      .min(2, { message: translate(t)("lastNameMin", "Last name must be at least 2 characters") }),
    acceptTerms: z.boolean().refine((val) => val === true, {
      message: translate(t)("termsRequired", "You must accept the terms and conditions"),
    }),
  });

export const createOtpSchema = (t?: (key: string) => string) =>
  z.object({
    code: z
      .string()
      .min(6, { message: translate(t)("codeInvalid", "Invalid verification code") })
      .max(6, { message: translate(t)("codeInvalid", "Invalid verification code") }),
  });

export const createForgotPasswordSchema = (t?: (key: string) => string) =>
  z.object({
    email: emailField(t),
  });

export const createResetPasswordSchema = (t?: (key: string) => string) =>
  z
    .object({
      password: passwordField(t),
      confirmPassword: z
        .string()
        .min(1, { message: translate(t)("passwordRequired", "Password is required") }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: translate(t)("passwordMismatch", "Passwords do not match"),
      path: ["confirmPassword"],
    });

export const createChangePasswordSchema = (t?: (key: string) => string) =>
  z
    .object({
      currentPassword: z
        .string()
        .min(1, {
          message: translate(t)("currentPasswordRequired", "Current password is required"),
        }),
      newPassword: passwordField(t),
      confirmPassword: z.string(),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: translate(t)("passwordMismatch", "Passwords do not match"),
      path: ["confirmPassword"],
    });

export const createEmailVerificationSchema = (t?: (key: string) => string) =>
  z.object({
    token: z
      .string()
      .min(1, { message: translate(t)("tokenRequired", "Verification token is required") }),
  });

export const createTwoFactorSetupSchema = (t?: (key: string) => string) =>
  z.object({
    secret: z.string().min(1, { message: translate(t)("secretRequired", "Secret is required") }),
    token: z
      .string()
      .min(6, { message: translate(t)("tokenMin", "Token must be at least 6 characters") })
      .max(6, { message: translate(t)("tokenMax", "Token must be exactly 6 characters") }),
  });
export const loginSchema = createLoginSchema();
export const signupSchema = createSignupSchema();
export const otpSchema = createOtpSchema();
export const forgotPasswordSchema = createForgotPasswordSchema();
export const resetPasswordSchema = createResetPasswordSchema();
export const changePasswordSchema = createChangePasswordSchema();
export const emailVerificationSchema = createEmailVerificationSchema();
export const twoFactorSetupSchema = createTwoFactorSetupSchema();
export type LoginFormValues = z.infer<ReturnType<typeof createLoginSchema>>;
export type SignupFormValues = z.infer<ReturnType<typeof createSignupSchema>>;
export type OtpFormValues = z.infer<ReturnType<typeof createOtpSchema>>;
export type ForgotPasswordFormValues = z.infer<ReturnType<typeof createForgotPasswordSchema>>;
export type ResetPasswordFormValues = z.infer<ReturnType<typeof createResetPasswordSchema>>;
export type ChangePasswordFormValues = z.infer<ReturnType<typeof createChangePasswordSchema>>;
export type EmailVerificationFormValues = z.infer<ReturnType<typeof createEmailVerificationSchema>>;
export type TwoFactorSetupFormValues = z.infer<ReturnType<typeof createTwoFactorSetupSchema>>;
