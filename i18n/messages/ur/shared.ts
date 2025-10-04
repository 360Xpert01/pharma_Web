const shared = {
  // ایرر باونڈری کمپوننٹ
  errorBoundary: {
    title: "کچھ غلط ہو گیا",
    subtitle: "اس صفحے کو لوڈ کرتے وقت ایک خرابی پیش آئی",
    retryButton: "دوبارہ کوشش کریں",
    homeButton: "ہوم پر جائیں",
    reportButton: "مسئلہ رپورٹ کریں",
  },

  // لوڈنگ اسٹیٹس
  loading: {
    default: "لوڈ ہو رہا ہے...",
    saving: "محفوظ کیا جا رہا ہے...",
    deleting: "حذف کیا جا رہا ہے...",
    uploading: "اپ لوڈ ہو رہا ہے...",
    processing: "پروسیسنگ ہو رہی ہے...",
    searching: "تلاش کی جا رہی ہے...",
    validating: "تصدیق ہو رہی ہے...",
    submitting: "جمع کیا جا رہا ہے...",
  },

  // ماڈل کمپوننٹس
  modal: {
    close: "بند کریں",
    cancel: "منسوخ کریں",
    confirm: "تصدیق کریں",
    save: "محفوظ کریں",
    delete: "حذف کریں",
    yes: "جی ہاں",
    no: "نہیں",
    ok: "ٹھیک ہے",
  },

  // الرٹ ماڈل
  alertModal: {
    warning: "انتباہ",
    error: "خرابی",
    success: "کامیابی",
    info: "معلومات",
    deleteTitle: "آئٹم حذف کریں",
    deleteMessage: "کیا آپ واقعی اس آئٹم کو حذف کرنا چاہتے ہیں؟ یہ عمل واپس نہیں لیا جا سکتا۔",
    unsavedChanges: "آپ کے پاس غیر محفوظ تبدیلیاں ہیں۔ کیا آپ واقعی جانا چاہتے ہیں؟",
  },

  // ڈیٹا ٹیبل کمپوننٹ
  dataTable: {
    noResults: "کوئی نتائج نہیں ملے",
    noData: "کوئی ڈیٹا دستیاب نہیں",
    loading: "ڈیٹا لوڈ ہو رہا ہے...",
    error: "ڈیٹا لوڈ کرنے میں ناکام",
    retry: "دوبارہ کوشش کریں",
    search: "تلاش...",
    filter: "فلٹر",
    sort: "ترتیب دیں",
    export: "ایکسپورٹ",
    rowsPerPage: "فی صفحہ قطاریں",
    showing: "دکھا رہا ہے",
    of: "میں سے",
    results: "نتائج",
    selectAll: "سب منتخب کریں",
    selected: "منتخب شدہ",
    actions: "اعمال",
    edit: "ترمیم کریں",
    view: "دیکھیں",
    delete: "حذف کریں",
  },

  // پیجینیشن کمپوننٹ
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

  // فائل اپ لوڈ کمپوننٹ
  fileUpload: {
    dropzone: "فائلیں یہاں چھوڑیں یا براؤز کرنے کے لیے کلک کریں",
    dragActive: "فائلیں یہاں چھوڑیں",
    browse: "فائلیں براؤز کریں",
    maxSize: "زیادہ سے زیادہ فائل سائز",
    allowedTypes: "اجازت شدہ فائل کی اقسام",
    uploading: "اپ لوڈ ہو رہا ہے...",
    uploadSuccess: "اپ لوڈ کامیاب رہا",
    uploadError: "اپ لوڈ ناکام ہوا",
    removeFile: "فائل ہٹا دیں",
    previewFile: "فائل کا پیش نظارہ",
  },

  // سرچ کمپوننٹ
  search: {
    placeholder: "تلاش...",
    clear: "تلاش صاف کریں",
    noResults: "کوئی نتائج نہیں ملے",
    searching: "تلاش کی جا رہی ہے...",
    suggestions: "تجاویز",
    recentSearches: "حالیہ تلاشیں",
    clearHistory: "تاریخ صاف کریں",
  },

  // فلٹر کمپوننٹ
  filter: {
    apply: "فلٹرز لگائیں",
    clear: "فلٹرز صاف کریں",
    reset: "ری سیٹ کریں",
    showMore: "مزید دکھائیں",
    showLess: "کم دکھائیں",
    selectAll: "سب منتخب کریں",
    deselectAll: "سب کو غیر منتخب کریں",
    activeFilters: "فعال فلٹرز",
    noFilters: "کوئی فلٹر لاگو نہیں کیا گیا",
  },

  // بریڈکرمز کمپوننٹ
  breadcrumbs: {
    home: "ہوم",
    dashboard: "ڈیش بورڈ",
    separator: "/",
    current: "موجودہ صفحہ",
  },

  // نیٹ ورک ایرر کمپوننٹ
  networkError: {
    title: "کنکشن کی خرابی",
    subtitle: "براہ کرم اپنا انٹرنیٹ کنکشن چیک کریں اور دوبارہ کوشش کریں",
    retryButton: "دوبارہ کوشش کریں",
    offlineMessage: "آپ اس وقت آف لائن ہیں",
    reconnecting: "دوبارہ کنیکٹ کیا جا رہا ہے...",
    connected: "کنکشن بحال ہو گیا",
  },

  // فارم ویلیڈیشن پیغامات
  validation: {
    required: "یہ فیلڈ ضروری ہے",
    email: "براہ کرم ایک درست ای میل ایڈریس درج کریں",
    minLength: "کم از کم لمبائی {min} حروف ہے",
    maxLength: "زیادہ سے زیادہ لمبائی {max} حروف ہے",
    pattern: "براہ کرم درست فارمیٹ درج کریں",
    numeric: "براہ کرم ایک درست نمبر درج کریں",
    phoneNumber: "براہ کرم ایک درست فون نمبر درج کریں",
    url: "براہ کرم ایک درست URL درج کریں",
    date: "براہ کرم ایک درست تاریخ درج کریں",
    time: "براہ کرم ایک درست وقت درج کریں",
    file: "براہ کرم ایک درست فائل منتخب کریں",
    fileSize: "فائل کا سائز {size} سے کم ہونا چاہیے",
    fileType: "براہ کرم ایک درست فائل کی قسم منتخب کریں",
  },
} as const;

export default shared;
export type SharedMessages = typeof shared;
