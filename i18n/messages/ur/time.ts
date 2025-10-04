const time = {
  // رشتہ دار وقت
  relative: {
    justNow: "ابھی ابھی",
    minuteAgo: "ایک منٹ پہلے",
    minutesAgo: "{minutes} منٹ پہلے",
    hourAgo: "ایک گھنٹہ پہلے",
    hoursAgo: "{hours} گھنٹے پہلے",
    dayAgo: "ایک دن پہلے",
    daysAgo: "{days} دن پہلے",
    weekAgo: "ایک ہفتہ پہلے",
    weeksAgo: "{weeks} ہفتے پہلے",
    monthAgo: "ایک مہینہ پہلے",
    monthsAgo: "{months} مہینے پہلے",
    yearAgo: "ایک سال پہلے",
    yearsAgo: "{years} سال پہلے",
  },

  // مطلق وقت کی مدتیں
  periods: {
    today: "آج",
    yesterday: "کل",
    tomorrow: "کل (آنے والا)",
    thisWeek: "اس ہفتے",
    lastWeek: "گزشتہ ہفتے",
    nextWeek: "اگلے ہفتے",
    thisMonth: "اس مہینے",
    lastMonth: "گزشتہ مہینے",
    nextMonth: "اگلے مہینے",
    thisYear: "اس سال",
    lastYear: "گزشتہ سال",
    nextYear: "اگلے سال",
    last7Days: "گزشتہ 7 دن",
    last30Days: "گزشتہ 30 دن",
    last90Days: "گزشتہ 90 دن",
    customRange: "حسب ضرورت مدت",
  },

  // ہفتے کے دن
  days: {
    monday: "پیر",
    tuesday: "منگل",
    wednesday: "بدھ",
    thursday: "جمعرات",
    friday: "جمعہ",
    saturday: "ہفتہ",
    sunday: "اتوار",
  },

  // دنوں کے مختصر نام
  daysShort: {
    mon: "پیر",
    tue: "منگل",
    wed: "بدھ",
    thu: "جمعرات",
    fri: "جمعہ",
    sat: "ہفتہ",
    sun: "اتوار",
  },

  // مہینے
  months: {
    january: "جنوری",
    february: "فروری",
    march: "مارچ",
    april: "اپریل",
    may: "مئی",
    june: "جون",
    july: "جولائی",
    august: "اگست",
    september: "ستمبر",
    october: "اکتوبر",
    november: "نومبر",
    december: "دسمبر",
  },

  // مہینوں کے مختصر نام
  monthsShort: {
    jan: "جنوری",
    feb: "فروری",
    mar: "مارچ",
    apr: "اپریل",
    may: "مئی",
    jun: "جون",
    jul: "جولائی",
    aug: "اگست",
    sep: "ستمبر",
    oct: "اکتوبر",
    nov: "نومبر",
    dec: "دسمبر",
  },

  // وقت کے فارمیٹس
  formats: {
    date: "DD/MM/YYYY",
    time: "HH:mm",
    datetime: "DD/MM/YYYY HH:mm",
    dateTimeLong: "D MMMM، YYYY کو h:mm A پر",
  },
} as const;

export default time;
export type TimeMessages = typeof time;
