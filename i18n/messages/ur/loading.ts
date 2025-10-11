const loading = {
  // برانڈ ٹیکسٹ جو تمام لوڈرز میں ظاہر ہوتا ہے
  BRAND_TEXT: "نیکسٹ بوائلر",

  // مختلف کانٹیکسٹ کے حساب سے ڈیفالٹ لوڈنگ پیغامات
  MESSAGES: {
    DEFAULT: "نیکسٹ بوائلر",
    DASHBOARD: "ڈیش بورڈ لوڈ ہو رہا ہے...",
    CHARTS: "چارٹس لوڈ ہو رہے ہیں...",
    DATA: "ڈیٹا لوڈ ہو رہا ہے...",
    PROFILE: "پروفائل لوڈ ہو رہا ہے...",
    SETTINGS: "سیٹنگز لوڈ ہو رہی ہیں...",
    AUTH: "تصدیق کی جا رہی ہے...",
    UPLOAD: "فائلز اپ لوڈ ہو رہی ہیں...",
    SAVE: "تبدیلیاں محفوظ کی جا رہی ہیں...",
    DELETE: "آئٹم حذف کیا جا رہا ہے...",
    EXPORT: "ڈیٹا ایکسپورٹ ہو رہا ہے...",
    SYNC: "ہم وقت سازی ہو رہی ہے...",
    PROCESSING: "درخواست پر عمل جاری ہے...",
    CONNECTING: "کنکشن قائم کیا جا رہا ہے...",
    REFRESHING: "ڈیٹا ریفریش ہو رہا ہے...",
    SEARCHING: "تلاش جاری ہے...",
    ANALYZING: "ڈیٹا کا تجزیہ کیا جا رہا ہے...",
    GENERATING: "رپورٹ تیار کی جا رہی ہے...",
    VALIDATING: "ان پٹ کی توثیق ہو رہی ہے...",
    INITIALIZING: "نیکسٹ بوائلر...",
  },

  // عام لوڈنگ ٹیکسٹ
  TEXT: {
    LOADING_CHARTS: "چارٹس لوڈ ہو رہے ہیں...",
    LOADING_METRICS: "نیکسٹ بوائلر کے میٹرکس لوڈ ہو رہے ہیں...",
    FROM_LAST_MONTH: "% پچھلے مہینے سے",
  },

  // مختلف آپریشنز کے لیے لوڈنگ کا دورانیہ (ملی سیکنڈ میں)
  DURATIONS: {
    QUICK: 500, // بٹن اسٹیٹس، سادہ آپریشنز
    NORMAL: 1500, // فارم جمع کروانا، API کالز
    SLOW: 3000, // فائل اپ لوڈز، بھاری پراسیسنگ
    VERY_SLOW: 5000, // بڑے ڈیٹا امپورٹس، پیچیدہ آپریشنز
  },

  // استعمال کے کیس کے حساب سے لوڈر ویریئنٹس
  VARIANTS: {
    OVERLAY: "default", // فل اسکرین اوورلے
    INLINE: "minimal", // کمپوننٹ کے اندر لوڈنگ
    BUTTON: "dots", // بٹن لوڈنگ اسٹیٹس
    CARD: "default", // کارڈ لوڈنگ اسٹیٹس
    TABLE: "minimal", // ٹیبل/لسٹ لوڈنگ
    CHART: "default", // چارٹ لوڈنگ
    FORM: "minimal", // فارم لوڈنگ
    MODAL: "default", // ماڈل لوڈنگ
  },

  // کانٹیکسٹ کے حساب سے سائز
  SIZES: {
    SMALL: "sm", // بٹن لوڈنگ، ان لائن عناصر
    MEDIUM: "md", // کارڈز، ماڈلز
    LARGE: "lg", // فل پیج، اوورلے
  },

  // تھیم کے حساب سے لوڈنگ رنگ (CSS کسٹم پراپرٹیز)
  THEME_COLORS: {
    PRIMARY: "hsl(var(--primary))",
    SECONDARY: "hsl(var(--secondary))",
    ACCENT: "hsl(var(--accent))",
    MUTED: "hsl(var(--muted))",
  },
} as const;

export default loading;
export type LoadingMessages = typeof loading;
