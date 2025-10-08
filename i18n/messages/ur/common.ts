const common = {
  // Common actions
  actions: {
    save: "محفوظ کریں",
    cancel: "منسوخ کریں",
    edit: "ترمیم کریں",
    delete: "حذف کریں",
    view: "دیکھیں",
    create: "بنائیں",
    update: "اپ ڈیٹ کریں",
    submit: "جمع کریں",
    reset: "ری سیٹ کریں",
    clear: "صاف کریں",
    copy: "کاپی کریں",
    paste: "پیسٹ کریں",
    cut: "کٹ کریں",
    undo: "واپس لائیں",
    redo: "دوبارہ کریں",
    print: "پرنٹ کریں",
    download: "ڈاؤن لوڈ کریں",
    upload: "اپ لوڈ کریں",
    share: "شیئر کریں",
    export: "ایکسپورٹ کریں",
    import: "امپورٹ کریں",
    refresh: "ریفریش کریں",
    reload: "ری لوڈ کریں",
    back: "واپس",
    forward: "آگے",
    close: "بند کریں",
    open: "کھولیں",
    expand: "پھیلائیں",
    collapse: "سکیڑیں",
    minimize: "چھوٹا کریں",
    maximize: "بڑا کریں",
    chooseOption: "آپ کیا کرنا چاہیں گے؟",
    continueMessage: "برائوزنگ جاری رکھنے کے لیے ذیل میں سے کوئی آپشن منتخب کریں",
  },

  // Status messages
  status: {
    success: "کامیابی",
    error: "خرابی",
    warning: "انتباہ",
    info: "معلومات",
    loading: "لوڈ ہو رہا ہے",
    saving: "محفوظ کیا جا رہا ہے",
    saved: "محفوظ ہو گیا",
    deleted: "حذف ہو گیا",
    updated: "اپ ڈیٹ ہو گیا",
    created: "بنا دیا گیا",
    uploaded: "اپ لوڈ ہو گیا",
    downloaded: "ڈاؤن لوڈ ہو گیا",
    copied: "کاپی ہو گیا",
    failed: "ناکام",
    completed: "مکمل",
    pending: "زیر التواء",
    processing: "پروسیسنگ ہو رہی ہے",
    cancelled: "منسوخ کر دیا گیا",
    redirecting: "ری ڈائریکٹ ہو رہا ہے...",
  },

  // Common phrases
  phrases: {
    welcome: "خوش آمدید",
    hello: "السلام علیکم",
    goodbye: "الوداع",
    yes: "جی ہاں",
    no: "نہیں",
    ok: "ٹھیک ہے",
    please: "براہ کرم",
    thankYou: "شکریہ",
    youreWelcome: "خوش آمدید",
    sorry: "معاف کیجیے",
    excuseMe: "معاف کیجیے گا",
    goodLuck: "نیک تمنائیں",
    congratulations: "مبارک ہو",
  },

  // Time references
  time: {
    now: "ابھی",
    today: "آج",
    yesterday: "کل",
    tomorrow: "کل (آئندہ)",
    thisWeek: "اس ہفتے",
    lastWeek: "پچھلے ہفتے",
    nextWeek: "اگلے ہفتے",
    thisMonth: "اس مہینے",
    lastMonth: "پچھلے مہینے",
    nextMonth: "اگلے مہینے",
    thisYear: "اس سال",
    lastYear: "پچھلے سال",
    nextYear: "اگلے سال",
  },

  // Navigation
  navigation: {
    home: "ہوم",
    dashboard: "ڈیش بورڈ",
    settings: "سیٹنگز",
    profile: "پروفائل",
    about: "ہمارے بارے میں",
    contact: "رابطہ",
    help: "مدد",
    docs: "دستاویزات",
  },

  // Troubleshooting
  troubleshooting: {
    clearCache: "اگر مسئلہ برقرار رہے تو اپنے براؤزر کا کیش صاف کریں",
    refreshPage: "صفحہ ریفریش کرنے کی کوشش کریں",
    contactSupport: "اگر مسئلہ جاری رہے تو سپورٹ سے رابطہ کریں",
  },

  // Language switcher
  languageSwitcher: {
    selectLanguage: "زبان منتخب کریں",
    changeLanguage: "زبان تبدیل کریں",
    currentLanguage: "موجودہ زبان",
    english: "English",
    urdu: "اردو",
    switchTo: "تبدیل کریں",
    tooltip: "زبان منتخب کریں",
    ariaLabel: "زبان تبدیل کرنے والا",
  },
} as const;

export default common;
export type CommonMessages = typeof common;
