jest.mock("next-intl/server", () => ({
  getRequestConfig: (handler: any) => handler,
}));

jest.mock("next-intl/routing", () => ({
  defineRouting: (config: any) => config,
}));

jest.mock("@/i18n/routing", () => ({
  routing: {
    locales: ["en", "ur"] as const,
    defaultLocale: "en" as const,
  },
}));

import requestConfig from "@/i18n/request";
import urMessages from "@/i18n/messages/ur/index";
import enMessages from "@/i18n/messages/en/index";

async function getMessagesForLocale(locale: string) {
  const config = await requestConfig({ requestLocale: Promise.resolve(locale) } as any);
  return config.messages;
}

describe("i18n request config", () => {
  it("loads Urdu footer translations", async () => {
    const messages = await getMessagesForLocale("ur");

    // Test footer fields
    expect(messages?.layout?.footer?.companyName).toBe("آپ کی کمپنی");
    expect(messages?.layout?.footer?.resourcesTitle).toBe("وسائل");
    expect(messages?.layout?.footer?.allRightsReserved).toBe("تمام حقوق محفوظ ہیں۔");

    // Test navigation fields
    expect(messages?.navigation?.privacy).toBe("رازداری");
    expect(messages?.navigation?.terms).toBe("شرائط");
    expect(messages?.navigation?.contact).toBe("رابطہ");
    expect(messages?.navigation?.about).toBe("ہمارے بارے میں");
    expect(messages?.navigation?.support).toBe("سپورٹ");
    expect(messages?.navigation?.changelog).toBe("تبدیلیوں کا ریکارڈ");

    // Test social media navigation fields
    expect(messages?.navigation?.github).toBe("گٹ ہب");
    expect(messages?.navigation?.twitter).toBe("ٹویٹر");
    expect(messages?.navigation?.linkedin).toBe("لنکڈان");
  });

  it("falls back to default locale when messages missing", async () => {
    const messages = await getMessagesForLocale("unknown-locale");

    expect(messages?.layout?.footer?.companyName).toBe("Your Company");
  });
});
