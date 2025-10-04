const navigation = {
  // مرکزی نیویگیشن آئٹمز
  main: {
    home: "ہوم",
    dashboard: "ڈیش بورڈ",
    settings: "ترتیبات",
    profile: "پروفائل",
    help: "مدد",
    about: "ہمارے بارے میں",
    contact: "رابطہ",
    documentation: "دستاویزات",
    site: "سائٹ",
    layout: "لے آؤٹ",
    layoutSettings: "لے آؤٹ کی ترتیبات",
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

  // آتھ نیویگیشن
  auth: {
    login: "لاگ ان",
    signup: "سائن اپ",
    logout: "لاگ آؤٹ",
    forgotPassword: "پاس ورڈ بھول گئے",
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
    contact: "رابطہ",
    about: "ہمارے بارے میں",
    github: "گٹ ہب",
    twitter: "ٹوئٹر",
    linkedin: "لنکڈ اِن",
    support: "مدد",
    documentation: "دستاویزات",
    changelog: "تبدیلیوں کا ریکارڈ",
  },

  // بریڈ کرم لیبلز
  breadcrumbs: {
    home: "ہوم",
    dashboard: "ڈیش بورڈ",
    current: "موجودہ",
  },

  // مینو لیبلز اور ایکشنز
  labels: {
    menu: "مینو",
    close: "بند کریں",
    expand: "پھیلائیں",
    collapse: "سکیڑیں",
    toggle: "ٹگل",
    open: "کھولیں",
    moreOptions: "مزید اختیارات",
    navigation: "نیویگیشن",
    navigationLabel: "ڈیش بورڈ",
    toggleMobileNav: "موبائل نیویگیشن ٹگل کریں",
    toggleSidebar: "سائیڈبار ٹگل کریں",
    collapseSidebar: "سائیڈبار سکیڑیں",
    expandSidebar: "سائیڈبار پھیلائیں",
  },

  // لے آؤٹ نیویگیشن ریفرنسز
  layout: {
    variant: "ورژن",
    width: "چوڑائی",
    logoText: "نیکسٹ اسٹارٹر",
  },

  // روٹ ٹائٹلز اور وضاحتیں
  routes: {
    "/dashboard": {
      title: "ڈیش بورڈ",
      description: "ڈیش بورڈ کا جائزہ",
    },
    "/": {
      title: "سائٹ",
      description: "مرکزی سائٹ پر جائیں",
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
      description: "تجزیہ اور میٹرکس دیکھیں",
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
      title: "رابطہ",
      description: "ہم سے رابطہ کریں",
    },
    "/about": {
      title: "ہمارے بارے میں",
      description: "ہمارے بارے میں معلومات",
    },
    "/docs": {
      title: "دستاویزات",
      description: "دستاویزات دیکھیں",
    },
    "/support": {
      title: "مدد",
      description: "مدد حاصل کریں",
    },
    "/changelog": {
      title: "تبدیلیوں کا ریکارڈ",
      description: "تبدیلیوں کی فہرست دیکھیں",
    },
  },

  // بیج لیبلز
  badges: {
    new: "نیا",
    demo: "ڈیمو",
    live: "لائیو",
    updated: "اپ ڈیٹ شدہ",
  },
} as const;

export default navigation;
export type NavigationMessages = typeof navigation;
