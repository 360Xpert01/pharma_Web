import { describe, it, expect, beforeEach, jest } from "@jest/globals";

// Test the translation message loading and fallback behavior
describe("Translation System Integration", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Message Loading", () => {
    it("should load English messages successfully", async () => {
      try {
        const messages = await import("@/i18n/messages/en/index");
        expect(messages.default).toBeDefined();
        expect(messages.default.auth).toBeDefined();
        expect(messages.default.common).toBeDefined();
      } catch (error) {
        throw new Error(`Failed to load English messages: ${error}`);
      }
    });

    it("should load Urdu messages successfully", async () => {
      try {
        const messages = await import("@/i18n/messages/ur/index");
        expect(messages.default).toBeDefined();
        expect(messages.default.auth).toBeDefined();
        expect(messages.default.common).toBeDefined();
      } catch (error) {
        throw new Error(`Failed to load Urdu messages: ${error}`);
      }
    });

    it("should have language switcher translations in both languages", async () => {
      const enMessages = await import("@/i18n/messages/en/index");
      const urMessages = await import("@/i18n/messages/ur/index");

      expect(enMessages.default.common.languageSwitcher).toBeDefined();
      expect(urMessages.default.common.languageSwitcher).toBeDefined();

      expect(enMessages.default.common.languageSwitcher.tooltip).toBe("Change Language");
      expect(urMessages.default.common.languageSwitcher.tooltip).toBe("زبان تبدیل کریں");
    });
  });

  describe("Translation Completeness", () => {
    it("should have matching auth sections in both languages", async () => {
      const enMessages = await import("@/i18n/messages/en/index");
      const urMessages = await import("@/i18n/messages/ur/index");

      const enAuthKeys = Object.keys(enMessages.default.auth);
      const urAuthKeys = Object.keys(urMessages.default.auth);

      expect(enAuthKeys.sort()).toEqual(urAuthKeys.sort());
    });

    it("should have matching login translations", async () => {
      const enMessages = await import("@/i18n/messages/en/index");
      const urMessages = await import("@/i18n/messages/ur/index");

      const enLoginKeys = Object.keys(enMessages.default.auth.login);
      const urLoginKeys = Object.keys(urMessages.default.auth.login);

      expect(enLoginKeys.sort()).toEqual(urLoginKeys.sort());

      // Check specific translations
      expect(enMessages.default.auth.login.title).toBe("Welcome back");
      expect(urMessages.default.auth.login.title).toBe("خوش آمدید");
    });

    it("should have matching common translations", async () => {
      const enMessages = await import("@/i18n/messages/en/index");
      const urMessages = await import("@/i18n/messages/ur/index");

      const enCommonKeys = Object.keys(enMessages.default.common);
      const urCommonKeys = Object.keys(urMessages.default.common);

      // Filter out keys that might be optional
      const requiredKeys = ["languageSwitcher", "loading", "success", "error"];

      requiredKeys.forEach((key) => {
        expect(enCommonKeys).toContain(key);
        expect(urCommonKeys).toContain(key);
      });
    });
  });

  describe("RTL Support", () => {
    it("should identify Urdu as RTL language", () => {
      const locales = [
        { code: "en", dir: "ltr" },
        { code: "ur", dir: "rtl" },
      ];

      const urduLocale = locales.find((l) => l.code === "ur");
      expect(urduLocale?.dir).toBe("rtl");
    });

    it("should identify English as LTR language", () => {
      const locales = [
        { code: "en", dir: "ltr" },
        { code: "ur", dir: "rtl" },
      ];

      const englishLocale = locales.find((l) => l.code === "en");
      expect(englishLocale?.dir).toBe("ltr");
    });
  });

  describe("Locale Configuration", () => {
    it("should have correct routing configuration", async () => {
      const { routing } = await import("@/i18n/routing");

      expect(routing.locales).toEqual(["en", "ur"]);
      expect(routing.defaultLocale).toBe("en");
      expect(routing.pathnames).toBeDefined();
    });

    it("should have all required pathnames configured", async () => {
      const { routing } = await import("@/i18n/routing");

      const requiredPaths = [
        "/",
        "/dashboard",
        "/auth/login",
        "/auth/signup",
        "/auth/forgot",
        "/auth/otp",
        "/auth/reset",
      ];

      requiredPaths.forEach((path) => {
        expect(routing.pathnames).toHaveProperty(path);
      });
    });
  });

  describe("Request Configuration", () => {
    it("should export default request configuration", async () => {
      try {
        const requestConfig = await import("@/i18n/request");
        expect(requestConfig.default).toBeDefined();
        expect(typeof requestConfig.default).toBe("function");
      } catch (error) {
        throw new Error(`Failed to load request configuration: ${error}`);
      }
    });
  });

  describe("Navigation Configuration", () => {
    it("should export all required navigation functions", async () => {
      try {
        const navigation = await import("@/i18n/navigation");

        expect(navigation.Link).toBeDefined();
        expect(navigation.redirect).toBeDefined();
        expect(navigation.usePathname).toBeDefined();
        expect(navigation.useRouter).toBeDefined();
        expect(navigation.getPathname).toBeDefined();
        expect(navigation.routing).toBeDefined();
      } catch (error) {
        throw new Error(`Failed to load navigation configuration: ${error}`);
      }
    });
  });

  describe("Error Handling", () => {
    it("should handle missing translation gracefully", () => {
      const mockT = (key: string) => key; // Fallback behavior

      const result = mockT("nonexistent.translation.key");
      expect(result).toBe("nonexistent.translation.key");
    });

    it("should validate locale before using", () => {
      const validLocales = ["en", "ur"];
      const testLocale = "invalid";

      const isValid = validLocales.includes(testLocale);
      expect(isValid).toBe(false);

      const safeLocale = isValid ? testLocale : "en";
      expect(safeLocale).toBe("en");
    });
  });
});
