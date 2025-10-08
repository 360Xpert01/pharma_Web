const time = {
  // Relative time
  relative: {
    justNow: "Just now",
    minuteAgo: "A minute ago",
    minutesAgo: "{minutes} minutes ago",
    hourAgo: "An hour ago",
    hoursAgo: "{hours} hours ago",
    dayAgo: "A day ago",
    daysAgo: "{days} days ago",
    weekAgo: "A week ago",
    weeksAgo: "{weeks} weeks ago",
    monthAgo: "A month ago",
    monthsAgo: "{months} months ago",
    yearAgo: "A year ago",
    yearsAgo: "{years} years ago",
  },

  // Absolute time periods
  periods: {
    today: "Today",
    yesterday: "Yesterday",
    tomorrow: "Tomorrow",
    thisWeek: "This week",
    lastWeek: "Last week",
    nextWeek: "Next week",
    thisMonth: "This month",
    lastMonth: "Last month",
    nextMonth: "Next month",
    thisYear: "This year",
    lastYear: "Last year",
    nextYear: "Next year",
    last7Days: "Last 7 days",
    last30Days: "Last 30 days",
    last90Days: "Last 90 days",
    customRange: "Custom range",
  },

  // Days of the week
  days: {
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
    sunday: "Sunday",
  },

  // Short days
  daysShort: {
    mon: "Mon",
    tue: "Tue",
    wed: "Wed",
    thu: "Thu",
    fri: "Fri",
    sat: "Sat",
    sun: "Sun",
  },

  // Months
  months: {
    january: "January",
    february: "February",
    march: "March",
    april: "April",
    may: "May",
    june: "June",
    july: "July",
    august: "August",
    september: "September",
    october: "October",
    november: "November",
    december: "December",
  },

  // Short months
  monthsShort: {
    jan: "Jan",
    feb: "Feb",
    mar: "Mar",
    apr: "Apr",
    may: "May",
    jun: "Jun",
    jul: "Jul",
    aug: "Aug",
    sep: "Sep",
    oct: "Oct",
    nov: "Nov",
    dec: "Dec",
  },

  // Time formats
  formats: {
    date: "MM/DD/YYYY",
    time: "HH:mm",
    datetime: "MM/DD/YYYY HH:mm",
    dateTimeLong: "MMMM D, YYYY at h:mm A",
  },
} as const;

export default time;
export type TimeMessages = typeof time;
