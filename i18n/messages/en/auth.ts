const auth = {
  // Login page
  login: {
    title: "Welcome back",
    subtitle: "Log in to your account",
    emailLabel: "Email",
    passwordLabel: "Password",
    submitButton: "Login",
    submittingButton: "Signing in...",
    noAccountText: "Don't have an account?",
    signupLink: "Sign up",
  },

  // Signup page
  signup: {
    title: "Create an account",
    emailLabel: "Email",
    passwordLabel: "Password",
    submitButton: "Sign up",
    submittingButton: "Creating account...",
    hasAccountText: "Already have an account?",
    loginLink: "Log in",
  },

  // Forgot password page
  forgot: {
    title: "Forgot your password?",
    subtitle: "Enter your email address and we'll send you a link to reset your password",
    emailLabel: "Email",
    submitButton: "Send reset link",
    submittingButton: "Sending...",
    backToLogin: "Back to login",
    successMessage: "Reset link sent to your email",
  },

  // OTP page
  otp: {
    title: "Enter verification code",
    subtitle: "We've sent a verification code to your email",
    codeLabel: "Verification code",
    submitButton: "Verify",
    submittingButton: "Verifying...",
    resendButton: "Resend code",
    resendText: "Didn't receive the code?",
    backToLogin: "Back to login",
  },

  // Reset password page
  reset: {
    title: "Reset your password",
    subtitle: "Enter your new password",
    newPasswordLabel: "New password",
    confirmPasswordLabel: "Confirm password",
    submitButton: "Reset password",
    submittingButton: "Resetting...",
    successMessage: "Password reset successfully",
    backToLogin: "Back to login",
  },

  // Common validation messages
  validation: {
    emailRequired: "Email is required",
    emailInvalid: "Please enter a valid email address",
    passwordRequired: "Password is required",
    passwordMinLength: "Password must be at least 6 characters",
    passwordMismatch: "Passwords do not match",
    codeRequired: "Verification code is required",
    codeInvalid: "Invalid verification code",
  },

  // Common error messages
  errors: {
    loginFailed: "Login failed. Please check your credentials.",
    signupFailed: "Sign up failed. Please try again.",
    resetFailed: "Failed to send reset link. Please try again.",
    verificationFailed: "Verification failed. Please try again.",
    passwordResetFailed: "Password reset failed. Please try again.",
    networkError: "Network error. Please check your connection.",
    serverError: "Server error. Please try again later.",
  },
} as const;

export default auth;
export type AuthMessages = typeof auth;
