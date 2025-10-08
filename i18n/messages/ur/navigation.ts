const navigation = {
  // مرکزی نیویگیشن آئٹمز
  main: {
    home: "صفحہ اول",
    dashboard: "ڈیش بورڈ",
    settings: "ترتیبات",
    profile: "پروفائل",
    help: "مدد",
    about: "ہمارے بارے میں",
    contact: "رابطہ کریں",
    documentation: "دستاویزات",
    site: "سائٹ",
    layout: "لے آؤٹ",
    layoutSettings: "لے آؤٹ ترتیبات",
  },

  // ڈیش بورڈ نیویگیشن
  dashboard: {
    overview: "جائزہ",
    analytics: "تجزیہ",
    reports: "رپورٹس",
    users: "صارفین",
    settings: "ترتیبات",
    activity: "سرگرمی",
    notifications: "اطلاعات",
    content: "مواد",
  },

  // توثیق (Auth) نیویگیشن
  auth: {
    login: "لاگ ان",
    signup: "سائن اپ",
    logout: "لاگ آؤٹ",
    forgotPassword: "پاس ورڈ بھول گئے؟",
    resetPassword: "پاس ورڈ ری سیٹ کریں",
    profile: "پروفائل",
    account: "اکاؤنٹ",
  },

  // فوٹر نیویگیشن
  footer: {
    privacy: "رازداری",
    privacyPolicy: "رازداری کی پالیسی",
    terms: "شرائط",
    termsOfService: "سروس کی شرائط",
    contact: "رابطہ کریں",
    about: "ہمارے بارے میں",
    github: "گِٹ ہب",
    twitter: "ٹوئٹر",
    linkedin: "لنکڈ اِن",
    support: "مدد",
    documentation: "دستاویزات",
    changelog: "تبدیلیوں کا ریکارڈ",
  },

  // بریڈ کرم لیبلز
  breadcrumbs: {
    home: "صفحہ اول",
    dashboard: "ڈیش بورڈ",
    current: "موجودہ صفحہ",
  },

  // مینو لیبلز اور ایکشنز
  labels: {
    menu: "مینو",
    close: "بند کریں",
    expand: "پھیلائیں",
    collapse: "سکیڑیں",
    toggle: "تبدیل کریں",
    open: "کھولیں",
    moreOptions: "مزید اختیارات",
    navigation: "نیویگیشن",
    navigationLabel: "ڈیش بورڈ",
    toggleMobileNav: "موبائل نیویگیشن تبدیل کریں",
    toggleSidebar: "سائیڈ بار تبدیل کریں",
    collapseSidebar: "سائیڈ بار سکیڑیں",
    expandSidebar: "سائیڈ بار پھیلائیں",
    goToHome: "صفحہ اول پر جائیں",
  },

  // لے آؤٹ نیویگیشن ریفرنسز
  layout: {
    variant: "انداز",
    width: "چوڑائی",
    logoText: "نیکسٹ اسٹارٹر",
  },

  // راستوں (Routes) کے عنوانات اور تفصیلات
  routes: {
    "/dashboard": {
      title: "ڈیش بورڈ",
      description: "ڈیش بورڈ کا جائزہ",
    },
    "/": {
      title: "سائٹ",
      description: "مرکزی سائٹ دیکھیں",
    },
    "/dashboard/layout-settings": {
      title: "لے آؤٹ",
      description: "لے آؤٹ ترتیب دیں",
    },
    "/dashboard/settings": {
      title: "ترتیبات",
      description: "ایپلیکیشن کی ترتیبات",
    },
    "/dashboard/analytics": {
      title: "تجزیہ",
      description: "تجزیات اور میٹرکس دیکھیں",
    },
    "/dashboard/users": {
      title: "صارفین",
      description: "صارفین اور اجازتیں منظم کریں",
    },
    "/dashboard/content": {
      title: "مواد",
      description: "مواد اور وسائل منظم کریں",
    },
    "/help": {
      title: "مدد",
      description: "مدد اور سپورٹ حاصل کریں",
    },
    "/privacy": {
      title: "رازداری",
      description: "رازداری کی پالیسی",
    },
    "/terms": {
      title: "شرائط",
      description: "سروس کی شرائط",
    },
    "/contact": {
      title: "رابطہ کریں",
      description: "ہم سے رابطہ کریں",
    },
    "/about": {
      title: "ہمارے بارے میں",
      description: "ہمارے بارے میں مزید معلومات",
    },
    "/docs": {
      title: "دستاویزات",
      description: "دستاویزات دیکھیں",
    },
    "/support": {
      title: "مدد",
      description: "سپورٹ حاصل کریں",
    },
    "/changelog": {
      title: "تبدیلیوں کا ریکارڈ",
      description: "تازہ تبدیلیاں دیکھیں",
    },
  },

  // بیجز کے لیبلز
  badges: {
    new: "نیا",
    demo: "ڈیمو",
    live: "براہِ راست",
    updated: "اپ ڈیٹ شدہ",
  },
} as const;

export default navigation;
export type NavigationMessages = typeof navigation;
