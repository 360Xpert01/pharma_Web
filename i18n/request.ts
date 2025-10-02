import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // Validate and normalize locale
  let locale = routing.defaultLocale;

  const resolvedLocale = await requestLocale;
  if (resolvedLocale && routing.locales.includes(resolvedLocale as any)) {
    locale = resolvedLocale as typeof routing.defaultLocale;
  }

  let messages;
  try {
    messages = (await import(`./messages/${locale}/index.ts`)).default;
  } catch (err) {
    console.error(`Failed to load translation file for locale: ${locale}`, err);
    // Fallback to default locale messages
    try {
      messages = (await import(`./messages/${routing.defaultLocale}/index.ts`)).default;
    } catch (fallbackErr) {
      console.error(`Failed to load fallback messages`, fallbackErr);
      messages = {};
    }
  }

  return {
    locale,
    messages,
  };
});
