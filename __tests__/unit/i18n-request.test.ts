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

async function getMessagesForLocale(locale: string) {
  const config = await requestConfig({ requestLocale: Promise.resolve(locale) } as any);
  return config.messages;
}

describe("i18n request config", () => {
  it("loads Urdu footer translations", async () => {
    const messages = await getMessagesForLocale("ur");

    // eslint-disable-next-line no-console
    console.log("messages", messages);
    expect(messages?.layout?.footer?.companyName).toBe("آپ کی کمپنی");
    expect(messages?.navigation?.privacy).toBe("رازداری");
  });

  it("falls back to default locale when messages missing", async () => {
    const messages = await getMessagesForLocale("unknown-locale");

    expect(messages?.layout?.footer?.companyName).toBe("Your Company");
  });
});
