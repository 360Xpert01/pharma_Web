const error = {
  // 404 Not Found page
  notFound: {
    title: "صفحہ نہیں ملا",
    description: "جس صفحے کی آپ تلاش کر رہے ہیں وہ موجود نہیں یا منتقل کر دیا گیا ہے۔",
    heading: "404",
    primaryButton: "گھر جائیں",
    secondaryButton: "واپس جائیں",
    refreshButton: "ریفریش",
    searchTitle: "مقبول صفحات",
    autoRedirectMessage: "{count} سیکنڈز میں ہوم پیج پر ری ڈائریکٹ کیا جا رہا ہے...",
    cancelRedirect: "منسوخ کریں",
    supportText: "اگر آپ کو لگتا ہے کہ یہ ایک غلطی ہے تو براہ کرم",
    contactSupport: "سپورٹ سے رابطہ کریں",
  },

  // Global Error page
  globalError: {
    title: "کچھ غلط ہو گیا!",
    description: "ایک غیر متوقع خرابی پیش آگئی",
    subtitle:
      "ایک غیر متوقع خرابی پیش آئی ہے۔ ہماری ٹیم کو مطلع کر دیا گیا ہے اور وہ اس کی تحقیقات کرے گی۔",
    tryAgainButton: "دوبارہ کوشش کریں",
    goHomeButton: "گھر جائیں",
    errorDetailsTitle: "خرابی کی تفصیلات (ڈیولپمنٹ)",
    errorIdLabel: "خرابی آئی ڈی:",
    notifiedMessage: "ہماری ٹیم کو مطلع کر دیا گیا ہے اور وہ اس کی تحقیقات کرے گی۔",
  },

  // Common error actions
  actions: {
    retry: "دوبارہ کوشش کریں",
    goHome: "گھر جائیں",
    goBack: "واپس جائیں",
    refresh: "ریفریش",
    reload: "ری لوڈ کریں",
    contactSupport: "سپورٹ سے رابطہ کریں",
    reportIssue: "مسئلہ رپورٹ کریں",
  },

  // Error status messages
  status: {
    loading: "لوڈ ہو رہا ہے...",
    retrying: "دوبارہ کوشش کی جا رہی ہے...",
    redirecting: "ری ڈائریکٹ کیا جا رہا ہے...",
    notified: "ٹیم کو اطلاع دے دی گئی",
    investigating: "تحقیقات جاری ہیں",
  },
} as const;

export default error;
export type ErrorMessages = typeof error;
