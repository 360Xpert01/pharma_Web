const common = {
  // Common actions
  actions: {
    save: "Save",
    cancel: "Cancel",
    edit: "Edit",
    delete: "Delete",
    view: "View",
    create: "Create",
    update: "Update",
    submit: "Submit",
    reset: "Reset",
    clear: "Clear",
    copy: "Copy",
    paste: "Paste",
    cut: "Cut",
    undo: "Undo",
    redo: "Redo",
    print: "Print",
    download: "Download",
    upload: "Upload",
    share: "Share",
    export: "Export",
    import: "Import",
    refresh: "Refresh",
    reload: "Reload",
    back: "Back",
    forward: "Forward",
    close: "Close",
    open: "Open",
    expand: "Expand",
    collapse: "Collapse",
    minimize: "Minimize",
    maximize: "Maximize",
    chooseOption: "What would you like to do?",
    continueMessage: "Choose an option below to continue browsing",
  },

  // Status messages
  status: {
    success: "Success",
    error: "Error",
    warning: "Warning",
    info: "Information",
    loading: "Loading",
    saving: "Saving",
    saved: "Saved",
    deleted: "Deleted",
    updated: "Updated",
    created: "Created",
    uploaded: "Uploaded",
    downloaded: "Downloaded",
    copied: "Copied",
    failed: "Failed",
    completed: "Completed",
    pending: "Pending",
    processing: "Processing",
    cancelled: "Cancelled",
    redirecting: "Redirecting...",
  },

  // Common phrases
  phrases: {
    welcome: "Welcome",
    hello: "Hello",
    goodbye: "Goodbye",
    yes: "Yes",
    no: "No",
    ok: "OK",
    please: "Please",
    thankYou: "Thank you",
    youreWelcome: "You're welcome",
    sorry: "Sorry",
    excuseMe: "Excuse me",
    goodLuck: "Good luck",
    congratulations: "Congratulations",
  },

  // Time references
  time: {
    now: "Now",
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
  },

  // Navigation
  navigation: {
    home: "Home",
    dashboard: "Dashboard",
    settings: "Settings",
    profile: "Profile",
    about: "About",
    contact: "Contact",
    help: "Help",
    docs: "Documentation",
  },

  // Troubleshooting
  troubleshooting: {
    clearCache: "If the problem persists, try clearing your browser cache",
    refreshPage: "Try refreshing the page",
    contactSupport: "Contact support if the issue continues",
  },

  // Language switcher
  languageSwitcher: {
    selectLanguage: "Select language",
    changeLanguage: "Change language",
    currentLanguage: "Current language",
    english: "English",
    urdu: "اردو",
    switchTo: "Switch to",
    tooltip: "Select language",
    ariaLabel: "Language switcher",
  },
} as const;

export default common;
export type CommonMessages = typeof common;
