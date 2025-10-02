const messages = {
  auth: {
    // Login page
    login: {
      title: "خوش آمدید",
      subtitle: "اپنے اکاؤنٹ میں لاگ ان کریں",
      emailLabel: "ای میل",
      passwordLabel: "پاس ورڈ",
      submitButton: "لاگ ان",
      submittingButton: "لاگ ان ہو رہے ہیں...",
      noAccountText: "کیا آپ کا اکاؤنٹ نہیں ہے؟",
      signupLink: "سائن اپ کریں",
    },

    // Signup page
    signup: {
      title: "اکاؤنٹ بنائیں",
      emailLabel: "ای میل",
      passwordLabel: "پاس ورڈ",
      submitButton: "سائن اپ",
      hasAccountText: "کیا آپ کا پہلے سے اکاؤنٹ ہے؟",
      loginLink: "لاگ ان کریں",
    },

    // Forgot password page
    forgot: {
      title: "اپنا پاس ورڈ بھول گئے؟",
      subtitle: "اپنا ای میل ایڈریس داخل کریں اور ہم آپ کو پاس ورڈ ری سیٹ کرنے کا لنک بھیجیں گے",
      emailLabel: "ای میل",
      submitButton: "ری سیٹ لنک بھیجیں",
      submittingButton: "بھیجا جا رہا ہے...",
      backToLogin: "لاگ ان پر واپس جائیں",
      successMessage: "ری سیٹ لنک آپ کے ای میل پر بھیج دیا گیا",
    },

    // OTP page
    otp: {
      title: "تصدیقی کوڈ داخل کریں",
      subtitle: "ہم نے آپ کے ای میل پر ایک تصدیقی کوڈ بھیجا ہے",
      codeLabel: "تصدیقی کوڈ",
      submitButton: "تصدیق کریں",
      submittingButton: "تصدیق ہو رہی ہے...",
      resendButton: "کوڈ دوبارہ بھیجیں",
      resendText: "کوڈ نہیں ملا؟",
      backToLogin: "لاگ ان پر واپس جائیں",
    },

    // Reset password page
    reset: {
      title: "اپنا پاس ورڈ ری سیٹ کریں",
      subtitle: "اپنا نیا پاس ورڈ داخل کریں",
      newPasswordLabel: "نیا پاس ورڈ",
      confirmPasswordLabel: "پاس ورڈ کی تصدیق کریں",
      submitButton: "پاس ورڈ ری سیٹ کریں",
      submittingButton: "ری سیٹ ہو رہا ہے...",
      successMessage: "پاس ورڈ کامیابی سے ری سیٹ ہو گیا",
      backToLogin: "لاگ ان پر واپس جائیں",
    },

    // Common validation messages
    validation: {
      emailRequired: "ای میل ضروری ہے",
      emailInvalid: "براہ کرم صحیح ای میل ایڈریس داخل کریں",
      passwordRequired: "پاس ورڈ ضروری ہے",
      passwordMinLength: "پاس ورڈ کم از کم 6 حروف کا ہونا ضروری ہے",
      passwordMismatch: "پاس ورڈ میں فرق ہے",
      codeRequired: "تصدیقی کوڈ ضروری ہے",
      codeInvalid: "غلط تصدیقی کوڈ",
    },

    // Common error messages
    errors: {
      loginFailed: "لاگ ان ناکام۔ براہ کرم اپنی اسناد چیک کریں۔",
      signupFailed: "سائن اپ ناکام۔ براہ کرم دوبارہ کوشش کریں۔",
      resetFailed: "ری سیٹ لنک بھیجنے میں ناکام۔ براہ کرم دوبارہ کوشش کریں۔",
      verificationFailed: "تصدیق ناکام۔ براہ کرم دوبارہ کوشش کریں۔",
      passwordResetFailed: "پاس ورڈ ری سیٹ ناکام۔ براہ کرم دوبارہ کوشش کریں۔",
      networkError: "نیٹ ورک کی خرابی۔ براہ کرم اپنا کنکشن چیک کریں۔",
      serverError: "سرور کی خرابی۔ براہ کرم بعد میں کوشش کریں۔",
    },
  },

  dashboard: {
    // Page Title and Meta
    title: "ڈیش بورڈ",
    description: "حقیقی وقت کی میٹرکس اور تجزیات کے ساتھ جامع ڈیش بورڈ",

    // Page sections
    sections: {
      metrics: "تجزیات",
      metricsDescription: "اہم کارکردگی میٹرکس اور شماریات",
      charts: "ڈیٹا کی تصویری نمائش",
      chartsDescription: "انٹرایکٹو چارٹس اور ڈیٹا کی تصویری نمائش",
      dataLists: "حالیہ سرگرمی",
      dataListsDescription: "تازہ ترین اپڈیٹس اور سرگرمی کے لاگز",
    },

    // Buttons and actions
    actions: {
      refresh: "تازہ کریں",
      loadingDemo: "لوڈنگ ڈیمو",
      settings: "سیٹنگز",
      export: "ایکسپورٹ",
      filter: "فلٹر",
      viewAll: "تمام دیکھیں",
      configure: "کنفیگر کریں",
    },

    // Loading states
    loading: {
      refreshing: "تازہ ہو رہا ہے...",
      loadingCharts: "چارٹس لوڈ ہو رہے ہیں...",
      loadingData: "ڈیٹا لوڈ ہو رہا ہے...",
      processing: "پروسیسنگ...",
    },

    // Success messages
    success: {
      refreshed: "ڈیش بورڈ کامیابی سے تازہ ہو گیا",
      dataUpdated: "ڈیٹا کامیابی سے اپڈیٹ ہو گیا",
      settingsSaved: "سیٹنگز کامیابی سے محفوظ ہو گئیں",
    },

    // Error messages
    errors: {
      refreshFailed: "ڈیش بورڈ ڈیٹا تازہ کرنے میں ناکام",
      loadFailed: "ڈیش بورڈ لوڈ کرنے میں ناکام",
      connectionError: "کنکشن کی خرابی ہوئی",
      dataError: "ڈیٹا لوڈ کرنے میں خرابی",
    },

    // Metrics Cards
    metrics: {
      totalUsers: "کل صارفین",
      activeUsers: "فعال صارفین",
      revenue: "آمدنی",
      conversionRate: "تبدیلی کی شرح",
      orders: "آرڈرز",
      growth: "اضافہ",
      bounceRate: "باؤنس ریٹ",
      pageViews: "صفحے کے مناظر",
      sessions: "سیشنز",
      avgSessionDuration: "اوسط سیشن کا دورانیہ",
      newUsers: "نئے صارفین",
      returningUsers: "واپس آنے والے صارفین",
    },

    // Chart Titles and Descriptions
    charts: {
      revenueTrend: {
        title: "آمدنی کا جائزہ",
        description: "ماہانہ آمدنی اور صارفین کا اضافہ",
        badge: "اپڈیٹ شدہ",
      },
      userActivity: {
        title: "صارفین کی سرگرمی",
        description: "روزانہ فعال صارفین اور مشغولیت",
      },
      salesComparison: {
        title: "فروخت کی کارکردگی",
        description: "سہ ماہی فروخت کا موازنہ",
      },
      trafficSources: {
        title: "ٹریفک کے ذرائع",
        description: "ذریعے کے مطابق ویب سائٹ ٹریفک",
      },
      performanceMetrics: {
        title: "کارکردگی کی میٹرکس",
        description: "اہم کارکردگی اشارے",
      },
      conversionFunnel: {
        title: "تبدیلی کا فنل",
        description: "صارف کی تبدیلی کا سفر",
      },
    },

    // Data Table
    table: {
      headers: {
        name: "نام",
        email: "ای میل",
        status: "حیثیت",
        role: "کردار",
        createdAt: "بنایا گیا",
        lastLogin: "آخری لاگ ان",
        actions: "اعمال",
        product: "پروڈکٹ",
        price: "قیمت",
        quantity: "مقدار",
        total: "کل",
        date: "تاریخ",
        user: "صارف",
        activity: "سرگرمی",
        time: "وقت",
      },
      noData: "کوئی ڈیٹا دستیاب نہیں",
      loading: "لوڈ ہو رہا ہے...",
      error: "ڈیٹا لوڈ کرنے میں ناکام",
      empty: "کوئی ریکارڈ نہیں ملا",
      rowsSelected: "قطاریں منتخب",
    },

    // Status Labels
    status: {
      active: "فعال",
      inactive: "غیر فعال",
      pending: "زیر التواء",
      completed: "مکمل",
      cancelled: "منسوخ",
      processing: "پروسیسنگ",
      verified: "تصدیق شدہ",
      suspended: "معطل",
    },

    // Time periods for filtering
    timePeriods: {
      today: "آج",
      yesterday: "کل",
      last7Days: "پچھلے 7 دن",
      last30Days: "پچھلے 30 دن",
      thisMonth: "اس مہینے",
      lastMonth: "پچھلے مہینے",
      thisYear: "اس سال",
      lastYear: "پچھلے سال",
      custom: "حسب ضرورت رینج",
    },
  },

  layout: {
    // Header component
    header: {
      logoText: "ڈیش بورڈ",
      toggleSidebarLabel: "سائیڈ بار ٹوگل کریں",
      toggleMobileNavLabel: "موبائل نیویگیشن ٹوگل کریں",
    },

    // Sidebar component
    sidebar: {
      collapseLabel: "سائیڈ بار چھپائیں",
      expandLabel: "سائیڈ بار بڑھائیں",
      navigationLabel: "اصل نیویگیشن",
    },

    // Footer component
    footer: {
      copyright: "© 2024 ڈیش بورڈ۔ تمام حقوق محفوظ ہیں۔",
      privacyPolicy: "رازداری کی پالیسی",
      termsOfService: "خدمات کی شرائط",
      contact: "رابطہ",
    },

    // Theme toggle component
    theme: {
      toggleLabel: "تھیم ٹوگل کریں",
      lightMode: "ہلکا موڈ",
      darkMode: "تاریک موڈ",
      systemMode: "سسٹم موڈ",
    },

    // User profile component
    profile: {
      profileLabel: "صارف پروفائل",
      accountSettings: "اکاؤنٹ سیٹنگز",
      preferences: "ترجیحات",
      logout: "لاگ آؤٹ",
      logoutConfirm: "کیا آپ واقعی لاگ آؤٹ کرنا چاہتے ہیں؟",
      cancel: "منسوخ",
      confirm: "تصدیق",
    },

    // Mobile menu component
    mobileMenu: {
      closeLabel: "مینو بند کریں",
      navigation: "نیویگیشن",
      settings: "سیٹنگز",
    },

    // Navigation items
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

    // Common layout labels
    common: {
      loading: "لوڈ ہو رہا ہے...",
      error: "خرابی",
      retry: "دوبارہ کوشش",
      close: "بند کریں",
      cancel: "منسوخ",
      save: "محفوظ کریں",
      edit: "ترمیم",
      delete: "حذف کریں",
      view: "دیکھیں",
      back: "واپس",
      next: "اگلا",
      previous: "پچھلا",
      search: "تلاش",
      filter: "فلٹر",
      sort: "ترتیب",
      export: "ایکسپورٹ",
      import: "امپورٹ",
      refresh: "تازہ کریں",
    },
  },

  shared: {
    // Error boundary component
    errorBoundary: {
      title: "کچھ غلط ہو گیا",
      subtitle: "اس صفحے کو لوڈ کرتے وقت خرابی پیش آئی",
      retryButton: "دوبارہ کوشش کریں",
      homeButton: "گھر جائیں",
      reportButton: "مسئلہ کی اطلاع دیں",
    },

    // Loading states
    loading: {
      default: "لوڈ ہو رہا ہے...",
      saving: "محفوظ ہو رہا ہے...",
      deleting: "حذف ہو رہا ہے...",
      uploading: "اپ لوڈ ہو رہا ہے...",
      processing: "پروسیسنگ...",
      searching: "تلاش کر رہے ہیں...",
      validating: "تصدیق ہو رہی ہے...",
      submitting: "جمع کر رہے ہیں...",
    },

    // Modal components
    modal: {
      close: "بند کریں",
      cancel: "منسوخ",
      confirm: "تصدیق",
      save: "محفوظ کریں",
      delete: "حذف کریں",
      yes: "ہاں",
      no: "نہیں",
      ok: "ٹھیک ہے",
    },

    // Alert modal
    alertModal: {
      warning: "تنبیہ",
      error: "خرابی",
      success: "کامیابی",
      info: "معلومات",
      deleteTitle: "آئٹم حذف کریں",
      deleteMessage: "کیا آپ واقعی یہ آئٹم حذف کرنا چاہتے ہیں؟ یہ عمل واپس نہیں ہو سکتا۔",
      unsavedChanges: "آپ کے پاس غیر محفوظ تبدیلیاں ہیں۔ کیا آپ واقعی چھوڑنا چاہتے ہیں؟",
    },

    // Data table component
    dataTable: {
      noResults: "کوئی نتائج نہیں ملے",
      noData: "کوئی ڈیٹا دستیاب نہیں",
      loading: "ڈیٹا لوڈ ہو رہا ہے...",
      error: "ڈیٹا لوڈ کرنے میں ناکام",
      retry: "دوبارہ کوشش",
      search: "تلاش...",
      filter: "فلٹر",
      sort: "ترتیب",
      export: "ایکسپورٹ",
      rowsPerPage: "فی صفحہ قطاریں",
      showing: "دکھایا جا رہا",
      of: "میں سے",
      results: "نتائج",
      selectAll: "تمام منتخب کریں",
      selected: "منتخب",
      actions: "اعمال",
      edit: "ترمیم",
      view: "دیکھیں",
      delete: "حذف کریں",
    },

    // Pagination component
    pagination: {
      previous: "پچھلا",
      next: "اگلا",
      first: "پہلا",
      last: "آخری",
      page: "صفحہ",
      of: "میں سے",
      goToPage: "صفحے پر جائیں",
      itemsPerPage: "فی صفحہ آئٹمز",
    },

    // File upload component
    fileUpload: {
      dropzone: "فائلیں یہاں چھوڑیں یا براؤز کرنے کے لیے کلک کریں",
      dragActive: "فائلیں یہاں چھوڑیں",
      browse: "فائلیں براؤز کریں",
      maxSize: "زیادہ سے زیادہ فائل سائز",
      allowedTypes: "مجاز فائل کی اقسام",
      uploading: "اپ لوڈ ہو رہا ہے...",
      uploadSuccess: "اپ لوڈ کامیاب",
      uploadError: "اپ لوڈ ناکام",
      removeFile: "فائل ہٹائیں",
      previewFile: "فائل پیش نظارہ",
    },

    // Search component
    search: {
      placeholder: "تلاش...",
      clear: "تلاش صاف کریں",
      noResults: "کوئی نتائج نہیں ملے",
      searching: "تلاش کر رہے ہیں...",
      suggestions: "تجاویز",
      recentSearches: "حالیہ تلاش",
      clearHistory: "تاریخ صاف کریں",
    },

    // Filter component
    filter: {
      apply: "فلٹرز لاگو کریں",
      clear: "فلٹرز صاف کریں",
      reset: "ری سیٹ",
      showMore: "مزید دکھائیں",
      showLess: "کم دکھائیں",
      selectAll: "تمام منتخب کریں",
      deselectAll: "تمام غیر منتخب کریں",
      activeFilters: "فعال فلٹرز",
      noFilters: "کوئی فلٹرز لاگو نہیں",
    },

    // Breadcrumbs component
    breadcrumbs: {
      home: "گھر",
      dashboard: "ڈیش بورڈ",
      separator: "/",
      current: "موجودہ صفحہ",
    },

    // Network error component
    networkError: {
      title: "کنکشن کی خرابی",
      subtitle: "براہ کرم اپنا انٹرنیٹ کنکشن چیک کریں اور دوبارہ کوشش کریں",
      retryButton: "دوبارہ کوشش",
      offlineMessage: "آپ فی الوقت آف لائن ہیں",
      reconnecting: "دوبارہ کنکٹ ہو رہا ہے...",
      connected: "کنکشن بحال ہو گیا",
    },

    // Form validation messages
    validation: {
      required: "یہ فیلڈ ضروری ہے",
      email: "براہ کرم صحیح ای میل ایڈریس داخل کریں",
      minLength: "کم سے کم لمبائی {min} حروف ہے",
      maxLength: "زیادہ سے زیادہ لمبائی {max} حروف ہے",
      pattern: "براہ کرم صحیح فارمیٹ داخل کریں",
      numeric: "براہ کرم صحیح نمبر داخل کریں",
      phoneNumber: "براہ کرم صحیح فون نمبر داخل کریں",
      url: "براہ کرم صحیح URL داخل کریں",
      date: "براہ کرم صحیح تاریخ داخل کریں",
      time: "براہ کرم صحیح وقت داخل کریں",
      file: "براہ کرم صحیح فائل منتخب کریں",
      fileSize: "فائل کا سائز {size} سے کم ہونا چاہیے",
      fileType: "براہ کرم صحیح فائل کی قسم منتخب کریں",
    },

    // Common actions
    actions: {
      save: "محفوظ کریں",
      cancel: "منسوخ",
      edit: "ترمیم",
      delete: "حذف کریں",
      view: "دیکھیں",
      create: "بنائیں",
      update: "اپڈیٹ",
      submit: "جمع کریں",
      reset: "ری سیٹ",
      clear: "صاف کریں",
      copy: "کاپی",
      paste: "پیسٹ",
      cut: "کٹ",
      undo: "کالعدم",
      redo: "دوبارہ کریں",
      print: "پرنٹ",
      download: "ڈاؤن لوڈ",
      upload: "اپ لوڈ",
      share: "شیئر",
      export: "ایکسپورٹ",
      import: "امپورٹ",
      refresh: "تازہ کریں",
      reload: "دوبارہ لوڈ",
      back: "واپس",
      forward: "آگے",
      close: "بند کریں",
      open: "کھولیں",
      expand: "پھیلائیں",
      collapse: "سمیٹیں",
      minimize: "چھوٹا کریں",
      maximize: "بڑا کریں",
    },

    // Status messages
    status: {
      success: "کامیابی",
      error: "خرابی",
      warning: "تنبیہ",
      info: "معلومات",
      loading: "لوڈنگ",
      saving: "محفوظ ہو رہا",
      saved: "محفوظ ہو گیا",
      deleted: "حذف ہو گیا",
      updated: "اپڈیٹ ہو گیا",
      created: "بن گیا",
      uploaded: "اپ لوڈ ہو گیا",
      downloaded: "ڈاؤن لوڈ ہو گیا",
      copied: "کاپی ہو گیا",
      failed: "ناکام",
      completed: "مکمل",
      pending: "زیر التواء",
      processing: "پروسیسنگ",
      cancelled: "منسوخ",
    },
  },

  form: {
    // Common form labels
    labels: {
      email: "ای میل",
      password: "پاس ورڈ",
      confirmPassword: "پاس ورڈ کی تصدیق",
      firstName: "پہلا نام",
      lastName: "آخری نام",
      fullName: "پورا نام",
      username: "صارف نام",
      phoneNumber: "فون نمبر",
      address: "پتہ",
      city: "شہر",
      state: "ریاست",
      zipCode: "ZIP کوڈ",
      country: "ملک",
      dateOfBirth: "تاریخ پیدائش",
      gender: "جنس",
      title: "عنوان",
      description: "تفصیل",
      category: "کیٹگری",
      tags: "ٹیگز",
      status: "حیثیت",
      priority: "اولویت",
      assignee: "تفویض کردہ",
      dueDate: "آخری تاریخ",
      startDate: "شروعاتی تاریخ",
      endDate: "اختتامی تاریخ",
      notes: "نوٹس",
      comments: "تبصرے",
      website: "ویب سائٹ",
      company: "کمپنی",
      position: "عہدہ",
    },

    // Common placeholders
    placeholders: {
      email: "اپنا ای میل ایڈریس داخل کریں",
      password: "اپنا پاس ورڈ داخل کریں",
      confirmPassword: "اپنے پاس ورڈ کی تصدیق کریں",
      firstName: "اپنا پہلا نام داخل کریں",
      lastName: "اپنا آخری نام داخل کریں",
      fullName: "اپنا پورا نام داخل کریں",
      username: "صارف نام منتخب کریں",
      phoneNumber: "اپنا فون نمبر داخل کریں",
      address: "اپنا پتہ داخل کریں",
      city: "اپنا شہر داخل کریں",
      state: "اپنی ریاست منتخب کریں",
      zipCode: "ZIP کوڈ داخل کریں",
      country: "اپنا ملک منتخب کریں",
      search: "تلاش...",
      selectOption: "آپشن منتخب کریں",
      enterValue: "قدر داخل کریں",
      typeHere: "یہاں ٹائپ کریں...",
      optional: "اختیاری",
      required: "ضروری",
      chooseFile: "فائل منتخب کریں",
      dragAndDrop: "فائلیں یہاں کھینچیں اور چھوڑیں",
    },

    // Form buttons
    buttons: {
      submit: "جمع کریں",
      save: "محفوظ کریں",
      cancel: "منسوخ",
      reset: "ری سیٹ",
      clear: "صاف کریں",
      add: "شامل کریں",
      remove: "ہٹائیں",
      edit: "ترمیم",
      delete: "حذف کریں",
      update: "اپڈیٹ",
      create: "بنائیں",
      upload: "اپ لوڈ",
      download: "ڈاؤن لوڈ",
      preview: "پیش نظارہ",
      back: "واپس",
      next: "اگلا",
      finish: "مکمل",
      close: "بند کریں",
      apply: "لاگو کریں",
      browse: "براؤز",
      search: "تلاش",
      filter: "فلٹر",
      sort: "ترتیب",
    },

    // Loading states for forms
    loading: {
      submitting: "جمع کر رہے ہیں...",
      saving: "محفوظ کر رہے ہیں...",
      uploading: "اپ لوڈ کر رہے ہیں...",
      processing: "پروسیسنگ...",
      validating: "تصدیق کر رہے ہیں...",
      loading: "لوڈ کر رہے ہیں...",
      creating: "بنا رہے ہیں...",
      updating: "اپڈیٹ کر رہے ہیں...",
      deleting: "حذف کر رہے ہیں...",
    },

    // Success messages
    success: {
      saved: "کامیابی سے محفوظ ہو گیا",
      updated: "کامیابی سے اپڈیٹ ہو گیا",
      created: "کامیابی سے بن گیا",
      deleted: "کامیابی سے حذف ہو گیا",
      uploaded: "کامیابی سے اپ لوڈ ہو گیا",
      submitted: "کامیابی سے جمع ہو گیا",
      sent: "کامیابی سے بھیج دیا گیا",
      copied: "کامیابی سے کاپی ہو گیا",
      imported: "کامیابی سے امپورٹ ہو گیا",
      exported: "کامیابی سے ایکسپورٹ ہو گیا",
    },

    // Validation messages
    validation: {
      required: "یہ فیلڈ ضروری ہے",
      emailInvalid: "براہ کرم صحیح ای میل ایڈریس داخل کریں",
      passwordTooShort: "پاس ورڈ کم از کم {min} حروف کا ہونا چاہیے",
      passwordMismatch: "پاس ورڈز میں فرق ہے",
      phoneInvalid: "براہ کرم صحیح فون نمبر داخل کریں",
      urlInvalid: "براہ کرم صحیح URL داخل کریں",
      dateInvalid: "براہ کرم صحیح تاریخ داخل کریں",
      numberInvalid: "براہ کرم صحیح نمبر داخل کریں",
      minLength: "کم از کم {min} حروف ہونے چاہیے",
      maxLength: "زیادہ سے زیادہ {max} حروف ہونے چاہیے",
      minValue: "کم از کم {min} ہونا چاہیے",
      maxValue: "زیادہ سے زیادہ {max} ہونا چاہیے",
      pattern: "براہ کرم صحیح فارمیٹ داخل کریں",
      uniqueError: "یہ قدر پہلے سے لی گئی ہے",
      fileSize: "فائل کا سائز {size} سے کم ہونا چاہیے",
      fileType: "براہ کرم صحیح فائل کی قسم منتخب کریں",
      fileTooMany: "بہت زیادہ فائلیں منتخب کی گئیں",
      terms: "آپ کو شرائط و ضوابط کو قبول کرنا ہوگا",
      privacy: "آپ کو رازداری کی پالیسی کو قبول کرنا ہوگا",
    },
  },

  home: {
    // Main hero section
    hero: {
      title: "قابل اعتماد، ٹائپ شدہ، اور قابل توسیع Next.js سٹارٹر کے ساتھ تیزی سے شپ کریں",
      description:
        "Redux Toolkit + Persist، React Query، Zod + React Hook Form، next-themes روشن/تاریک/سمندری کے ساتھ، interceptors کے ساتھ axios، اور ایک طاقتور قابل اعتماد لے آؤٹ سسٹم شامل ہے جو ویب سائٹس، ڈیش بورڈز، اور پورٹلز کے لیے موافق ہے۔",
      primaryButton: "ڈیش بورڈ کھولیں",
      primaryButtonLabel: "ڈیش بورڈ کھولیں",
      secondaryButton: "لے آؤٹ سیٹنگز آزمائیں",
      secondaryButtonLabel: "لے آؤٹ سیٹنگز آزمائیں",
    },

    // Feature showcase
    features: {
      layoutSystemTitle: "قابل اعتماد لے آؤٹ سسٹم",
      layoutSystemDescription:
        "حقیقی وقت کی پیش نظارہ کے ساتھ ہیڈرز، سائیڈ بارز، فوٹرز، اور کنٹینٹ لے آؤٹس کو حرکی طور پر کنفیگر کریں۔",
      layoutSystemIcon: "🎨",
    },

    // Navigation
    navigation: {
      home: "گھر",
      dashboard: "ڈیش بورڈ",
      settings: "سیٹنگز",
      docs: "دستاویزات",
      about: "کے بارے میں",
    },
  },

  error: {
    // 404 Not Found page
    notFound: {
      title: "صفحہ نہیں ملا",
      description: "جو صفحہ آپ تلاش کر رہے ہیں موجود نہیں ہے یا ہٹا دیا گیا ہے۔",
      heading: "404",
      primaryButton: "گھر جائیں",
      secondaryButton: "واپس جائیں",
      refreshButton: "تازہ کریں",
      searchTitle: "مشہور صفحات",
      autoRedirectMessage: "{count} سیکنڈ میں ہوم پیج پر بھیجا جا رہا ہے...",
      cancelRedirect: "منسوخ",
      supportText: "اگر آپ کو یقین ہے کہ یہ ایک خرابی ہے، تو براہ کرم",
      contactSupport: "سپورٹ سے رابطہ کریں",
    },

    // Global Error page
    globalError: {
      title: "کچھ غلط ہو گیا!",
      description: "ایک غیر متوقع خرابی ہوئی",
      subtitle: "ایک غیر متوقع خرابی ہوئی۔ ہماری ٹیم کو اطلاع دے دی گئی ہے اور وہ تحقیق کریں گے۔",
      tryAgainButton: "دوبارہ کوشش کریں",
      goHomeButton: "گھر جائیں",
      errorDetailsTitle: "خرابی کی تفصیلات (ڈیولپمنٹ)",
      errorIdLabel: "خرابی کی شناخت:",
      notifiedMessage: "ہماری ٹیم کو اطلاع دے دی گئی ہے اور وہ تحقیق کریں گے۔",
    },

    // Common error actions
    actions: {
      retry: "دوبارہ کوشش کریں",
      goHome: "گھر جائیں",
      goBack: "واپس جائیں",
      refresh: "تازہ کریں",
      reload: "دوبارہ لوڈ کریں",
      contactSupport: "سپورٹ سے رابطہ کریں",
      reportIssue: "مسئلہ کی اطلاع دیں",
    },

    // Error status messages
    status: {
      loading: "لوڈ ہو رہا ہے...",
      retrying: "دوبارہ کوشش کر رہے ہیں...",
      redirecting: "بھیجا جا رہا ہے...",
      notified: "ٹیم کو اطلاع دی گئی",
      investigating: "تحقیق جاری ہے",
    },
  },

  common: {
    // App information
    appName: "ڈیش بورڈ",
    companyName: "آپ کی کمپنی",
    supportEmail: "support@yourcompany.com",
    welcome: "خوش آمدید",
    logout: "لاگ آؤٹ",
    login: "لاگ ان",
    loading: "لوڈ ہو رہا ہے...",
    save: "محفوظ کریں",
    cancel: "منسوخ",
    delete: "حذف کریں",
    edit: "ترمیم",
    view: "دیکھیں",
    create: "بنائیں",
    update: "اپڈیٹ",
    search: "تلاش",
    filter: "فلٹر",
    close: "بند کریں",
    open: "کھولیں",
    languageSwitcher: {
      tooltip: "زبان تبدیل کریں",
      ariaLabel: "زبان تبدیل کریں",
      currentLanguage: "موجودہ زبان",
      clickToChange: "زبان تبدیل کرنے کے لیے کلک کریں",
    },
    yes: "ہاں",
    no: "نہیں",
    ok: "ٹھیک ہے",
    confirm: "تصدیق",
    success: "کامیابی",
    error: "خرابی",
    warning: "تنبیہ",
    info: "معلومات",

    // Date formats (for display purposes)
    dateFormats: {
      short: "MMM dd, yyyy",
      long: "MMMM dd, yyyy",
      full: "EEEE, MMMM dd, yyyy",
      iso: "yyyy-MM-dd",
      time: "HH:mm",
      datetime: "MMM dd, yyyy HH:mm",
    },
  },

  metadata: {
    title: "ڈیش بورڈ - جدید ویب ایپلی کیشن",
    description: "حقیقی وقت کی میٹرکس اور تجزیات کے ساتھ جامع ڈیش بورڈ",
    keywords: "ڈیش بورڈ، تجزیات، میٹرکس، ویب ایپلی کیشن",
  },

  navigation: {
    home: "گھر",
    dashboard: "ڈیش بورڈ",
    settings: "سیٹنگز",
    profile: "پروفائل",
    help: "مدد",
    documentation: "دستاویزات",
    logout: "لاگ آؤٹ",
  },

  time: {
    now: "اب",
    today: "آج",
    yesterday: "کل",
    tomorrow: "کل",
    minutes: "منٹ",
    hours: "گھنٹے",
    days: "دن",
    weeks: "ہفتے",
    months: "مہینے",
    years: "سال",
    ago: "پہلے",
    in: "میں",
    at: "پر",
    on: "پر",
  },
} as const;

export default messages;
export type Messages = typeof messages;
