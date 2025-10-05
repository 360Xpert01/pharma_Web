const layout = {
  // ہیڈر کمپوننٹ
  header: {
    logoText: "ڈیش بورڈ",
    toggleSidebarLabel: "سائیڈ بار تبدیل کریں",
    toggleMobileNavLabel: "موبائل نیویگیشن تبدیل کریں",
  },

  // سائیڈ بار کمپوننٹ
  sidebar: {
    collapseLabel: "سائیڈ بار سمیٹیں",
    expandLabel: "سائیڈ بار پھیلائیں",
    navigationLabel: "اہم نیویگیشن",
  },

  // فوٹر کمپوننٹ
  footer: {
    copyright: "© 2024 ڈیش بورڈ۔ جملہ حقوق محفوظ ہیں۔",
    privacyPolicy: "پرائیویسی پالیسی",
    termsOfService: "سروس کی شرائط",
    contact: "رابطہ",
    companyName: "نیکسٹ اسٹارٹر",
    companyDescription:
      "ایک جدید Next.js اسٹارٹر ٹیمپلیٹ جس میں TypeScript، Tailwind CSS اور مزید شامل ہیں۔",
    allRightsReserved: "جملہ حقوق محفوظ ہیں",
    quickLinksTitle: "فوری روابط",
    resourcesTitle: "وسائل",
  },

  // تھیم ٹوگل کمپوننٹ
  theme: {
    toggleLabel: "تھیم تبدیل کریں",
    lightMode: "لائٹ موڈ",
    darkMode: "ڈارک موڈ",
    oceanMode: "اوشن موڈ",
    systemMode: "سسٹم موڈ",
  },

  // یوزر پروفائل کمپوننٹ
  profile: {
    profileLabel: "صارف پروفائل",
    accountSettings: "اکاؤنٹ سیٹنگز",
    preferences: "ترجیحات",
    logout: "لاگ آؤٹ",
    logoutConfirm: "کیا آپ واقعی لاگ آؤٹ کرنا چاہتے ہیں؟",
    cancel: "منسوخ کریں",
    confirm: "تصدیق کریں",
  },

  // موبائل مینو کمپوننٹ
  mobileMenu: {
    closeLabel: "مینو بند کریں",
    navigation: "نیویگیشن",
    settings: "سیٹنگز",
  },

  // نیویگیشن آئٹمز
  navigation: {
    dashboard: "ڈیش بورڈ",
    analytics: "تجزیات",
    reports: "رپورٹس",
    settings: "سیٹنگز",
    users: "صارفین",
    profile: "پروفائل",
    help: "مدد",
    documentation: "دستاویزات",
  },
} as const;

export default layout;
export type LayoutMessages = typeof layout;
