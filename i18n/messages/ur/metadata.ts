const metadata = {
  // ڈیفالٹ میٹا ڈیٹا
  default: {
    title: "نیکسٹ.جے ایس اسٹارٹر",
    description: "ایک جدید نیکسٹ.جے ایس اسٹارٹر ٹائپ اسکرپٹ، ٹیل ونڈ CSS اور مزید کے ساتھ",
    keywords: "nextjs, typescript, tailwindcss, starter, template",
  },

  // ہر صفحے کے لیے مخصوص میٹا ڈیٹا
  pages: {
    home: {
      title: "ہوم - نیکسٹ.جے ایس اسٹارٹر",
      description: "ہمارے جدید نیکسٹ.جے ایس اسٹارٹر ٹیمپلیٹ میں خوش آمدید",
    },
    dashboard: {
      title: "ڈیش بورڈ - نیکسٹ.جے ایس اسٹارٹر",
      description: "ریئل ٹائم میٹرکس اور اینالٹکس کے ساتھ جامع ڈیش بورڈ",
    },
    auth: {
      login: {
        title: "لاگ ان - نیکسٹ.جے ایس اسٹارٹر",
        description: "اپنے اکاؤنٹ میں سائن ان کریں",
      },
      signup: {
        title: "سائن اپ - نیکسٹ.جے ایس اسٹارٹر",
        description: "نیا اکاؤنٹ بنائیں",
      },
      forgot: {
        title: "پاس ورڈ بھول گئے - نیکسٹ.جے ایس اسٹارٹر",
        description: "اپنا پاس ورڈ ری سیٹ کریں",
      },
    },
    error: {
      title: "غلطی - نیکسٹ.جے ایس اسٹارٹر",
      description: "ایک خرابی پیش آگئی ہے",
    },
    notFound: {
      title: "صفحہ نہیں ملا - نیکسٹ.جے ایس اسٹارٹر",
      description: "جس صفحے کی آپ تلاش کر رہے ہیں وہ موجود نہیں ہے",
    },
  },

  // اوپن گراف میٹا ڈیٹا
  openGraph: {
    siteName: "نیکسٹ.جے ایس اسٹارٹر",
    type: "ویب سائٹ",
    locale: "ur_PK",
  },

  // ٹوئٹر میٹا ڈیٹا
  twitter: {
    card: "summary_large_image",
    site: "@nextjs",
    creator: "@nextjs",
  },
} as const;

export default metadata;
export type MetadataMessages = typeof metadata;
