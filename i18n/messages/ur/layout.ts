const layout = {
  // ہیڈر کمپوننٹ
  header: {
    logoText: "ڈیش بورڈ",
    toggleSidebarLabel: "سائیڈ بار تبدیل کریں",
    toggleMobileNavLabel: "موبائل نیویگیشن تبدیل کریں",
  },

  // سائیڈ بار کمپوننٹ
  sidebar: {
    navigationLabel: "نیکسٹ بوائلر",
    collapseLabel: "سائڈ بار سمیٹیں",
    expandLabel: "سائڈ بار پھیلائیں",
    layoutSettings: "لے آؤٹ سیٹنگز",
    sidebarVariant: "سائڈ بار کی قسم",
    sidebarWidth: "سائڈ بار چوڑائی",
    sidebarWidthValue: "64px",
    headerTitle: "نیکسٹ بوائلر",
    headerLogoAlt: "ایپ کا لوگو",
    footerSettings: "لے آؤٹ سیٹنگز",
    footerVariant: "ویریئنٹ",
    footerWidth: "چوڑائی",
    collapsedFooter: "سائڈ بار سمیٹی گئی ہے",
    items: [
      { href: "/", title: "ہوم" },
      { href: "/dashboard", title: "ڈیش بورڈ" },
      { href: "/analytics", title: "تجزیہ" },
      { href: "/settings", title: "سیٹنگز" },
      { href: "/profile", title: "پروفائل" },
    ],
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
    documentation: "دستاویزات",
    support: "مدد",
    changelog: "تبدیلیوں کا ریکارڈ",
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
    profile: "پروفائل",
    settings: "سیٹنگز",
    help: "مدد اور سپورٹ",
    logout: "لاگ آؤٹ",
    loggingOut: "لاگ آؤٹ ہو رہا ہے...",
    logoutConfirm: "کیا آپ واقعی لاگ آؤٹ کرنا چاہتے ہیں؟",
    cancel: "منسوخ کریں",
    confirm: "تصدیق کریں",
    clickForOptions: "اختیارات کے لیے کلک کریں",
  },

  // تصدیقی سیکشن
  auth: {
    authSection: "تصدیق",
    notLoggedIn: "لاگ ان نہیں ہے",
    loginRequired: "آگے بڑھنے کے لیے براہ کرم لاگ ان کریں",
    guestUser: "مہمان صارف",
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
