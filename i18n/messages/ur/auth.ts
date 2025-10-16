const auth = {
  // Login page
  login: {
    title: "خوش آمدید",
    subtitle: "اپنے اکاؤنٹ میں لاگ ان کریں",
    emailLabel: "ای میل",
    passwordLabel: "پاس ورڈ",
    submitButton: "لاگ ان",
    submittingButton: "سائن اِن ہو رہا ہے...",
    noAccountText: "کیا آپ کا اکاؤنٹ نہیں ہے؟",
    signupLink: "اکاؤنٹ بنائیں",
    forgotLink: "کیا آپ پاس ورڈ بھول گئے؟",
    success: "لاگ ان ہو گیا",
    error: "لاگ ان ناکام",
  },

  // Signup page
  signup: {
    title: "اکاؤنٹ بنائیں",
    subtitle: "شروع کرنے کے لیے سائن اپ کریں",
    emailLabel: "ای میل",
    passwordLabel: "پاس ورڈ",
    submitButton: "اکاؤنٹ بنائیں",
    submittingButton: "اکاؤنٹ بنایا جا رہا ہے...",
    hasAccountText: "کیا آپ کا پہلے سے اکاؤنٹ ہے؟",
    loginLink: "لاگ ان کریں",
    success: "اکاؤنٹ کامیابی سے بن گیا",
    successDescription: "آپ کا اکاؤنٹ بن گیا ہے۔ براہ کرم لاگ ان کریں۔",
    error: "اکاؤنٹ بنانا ناکام",
  },

  // Forgot password page
  forgot: {
    title: "کیا آپ پاس ورڈ بھول گئے؟",
    subtitle: "اپنا ای میل ایڈریس درج کریں اور ہم آپ کو پاس ورڈ ری سیٹ کرنے کا لنک بھیجیں گے",
    emailLabel: "ای میل",
    submitButton: "ری سیٹ لنک بھیجیں",
    submittingButton: "بھیجا جا رہا ہے...",
    backToLogin: "واپس لاگ ان پر جائیں",
    successMessage: "ری سیٹ لنک آپ کے ای میل پر بھیج دیا گیا ہے",
  },

  // OTP page
  otp: {
    title: "تصدیقی کوڈ درج کریں",
    subtitle: "ہم نے آپ کے ای میل پر ایک تصدیقی کوڈ بھیجا ہے",
    codeLabel: "تصدیقی کوڈ",
    submitButton: "تصدیق کریں",
    submittingButton: "تصدیق کی جا رہی ہے...",
    resendButton: "کوڈ دوبارہ بھیجیں",
    resendingButton: "دوبارہ بھیجا جا رہا ہے...",
    resendText: "کیا آپ کو کوڈ موصول نہیں ہوا؟",
    backToLogin: "واپس لاگ ان پر جائیں",
    verifiedMessage: "کامیابی سے تصدیق ہو گئی",
    verifiedDescription: "آپ کا کوڈ کامیابی سے تصدیق ہو گیا ہے۔",
    verificationFailed: "تصدیق ناکام ہو گئی",
    resendSuccess: "کوڈ دوبارہ بھیج دیا گیا",
    resendSuccessDescription: "ایک نیا تصدیقی کوڈ آپ کے ای میل پر بھیج دیا گیا ہے۔",
    resendFailed: "کوڈ دوبارہ بھیجنے میں ناکامی",
  },

  // Reset password page
  reset: {
    title: "اپنا پاس ورڈ ری سیٹ کریں",
    subtitle: "اپنا نیا پاس ورڈ درج کریں",
    newPasswordLabel: "نیا پاس ورڈ",
    confirmPasswordLabel: "پاس ورڈ کی تصدیق کریں",
    submitButton: "پاس ورڈ ری سیٹ کریں",
    submittingButton: "ری سیٹ کیا جا رہا ہے...",
    successMessage: "پاس ورڈ کامیابی سے ری سیٹ ہو گیا ہے",
    backToLogin: "واپس لاگ ان پر جائیں",
  },

  // Common validation messages
  validation: {
    emailRequired: "ای میل لازمی ہے",
    emailInvalid: "براہ کرم درست ای میل درج کریں",
    passwordRequired: "پاس ورڈ لازمی ہے",
    passwordMinLength: "پاس ورڈ کم از کم 6 حروف کا ہونا چاہئے",
    passwordMismatch: "پاس ورڈ میل نہیں کھاتے",
    codeRequired: "تصدیقی کوڈ لازمی ہے",
  },

  // Common error messages
  errors: {
    loginFailed: "لاگ ان ناکام ہو گیا۔ براہ کرم اپنی تفصیلات چیک کریں۔",
    signupFailed: "اکاؤنٹ بنانا ناکام ہو گیا۔ دوبارہ کوشش کریں۔",
    resetFailed: "ری سیٹ لنک بھیجنے میں ناکامی۔ دوبارہ کوشش کریں۔",
    verificationFailed: "تصدیق ناکام ہو گئی۔ دوبارہ کوشش کریں۔",
    passwordResetFailed: "پاس ورڈ ری سیٹ ناکام ہو گیا۔ دوبارہ کوشش کریں۔",
    networkError: "نیٹ ورک کی خرابی۔ براہ کرم اپنا کنکشن چیک کریں۔",
    serverError: "سرور کی خرابی۔ براہ کرم بعد میں دوبارہ کوشش کریں۔",
  },

  // Auth buttons and navigation
  buttons: {
    login: "لاگ ان",
    signup: "اکاؤنٹ بنائیں",
    getStarted: "شروع کریں",
    signIn: "سائن ان",
    register: "رجسٹر کریں",
    joinNow: "اب شامل ہوں",
  },

  // Auth labels and tooltips
  labels: {
    loginToAccount: "اپنے اکاؤنٹ میں لاگ ان کریں",
    createNewAccount: "نیا اکاؤنٹ بنائیں",
    welcomeBack: "خوش آمدید",
    joinUs: "آج ہی ہمارے ساتھ جڑیں",
  },
} as const;

export default auth;
export type AuthMessages = typeof auth;
