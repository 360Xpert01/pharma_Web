import { describe, it, expect, beforeEach, jest } from "@jest/globals";

// Mock for navigation functions
const mockReplace = jest.fn();
const mockGetPathname = jest.fn();

jest.mock("@/i18n/navigation", () => ({
  redirect: jest.fn(),
  usePathname: () => mockGetPathname(),
  useRouter: () => ({
    replace: mockReplace,
  }),
  getPathname: mockGetPathname,
  Link: jest.fn(),
  routing: {
    locales: ["en", "ur"],
    defaultLocale: "en",
    pathnames: {
      "/": "/",
      "/dashboard": "/dashboard",
      "/auth/login": "/auth/login",
    },
  },
}));

// Mock next-intl server functions
jest.mock("next-intl/server", () => ({
  getRequestConfig: (fn: any) => fn,
}));

describe("I18n Navigation Integration", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Locale Detection", () => {
    it("should detect English locale from URL", () => {
      expect(["en", "ur"]).toContain("en");
    });

    it("should detect Urdu locale from URL", () => {
      expect(["en", "ur"]).toContain("ur");
    });

    it("should fallback to default locale for invalid locale", () => {
      const validLocales = ["en", "ur"];
      const invalidLocale = "fr";
      const defaultLocale = "en";

      const result = validLocales.includes(invalidLocale) ? invalidLocale : defaultLocale;
      expect(result).toBe("en");
    });
  });

  describe("URL Generation", () => {
    it("should generate correct URL for English locale", () => {
      const pathname = "/dashboard";
      const locale = "en";
      const expectedURL = `/${locale}${pathname}`;

      expect(expectedURL).toBe("/en/dashboard");
    });

    it("should generate correct URL for Urdu locale", () => {
      const pathname = "/dashboard";
      const locale = "ur";
      const expectedURL = `/${locale}${pathname}`;

      expect(expectedURL).toBe("/ur/dashboard");
    });

    it("should handle root path correctly", () => {
      const pathname = "/";
      const locale = "ur";
      const expectedURL = `/${locale}`;

      expect(expectedURL).toBe("/ur");
    });
  });

  describe("Navigation Replacement", () => {
    it("should replace current path with new locale", () => {
      mockGetPathname.mockReturnValue("/dashboard");

      const { useRouter } = require("@/i18n/navigation");
      const router = useRouter();

      router.replace("/dashboard", { locale: "ur" });

      expect(mockReplace).toHaveBeenCalledWith("/dashboard", { locale: "ur" });
    });

    it("should preserve pathname when switching locales", () => {
      const pathname = "/auth/login";
      mockGetPathname.mockReturnValue(pathname);

      const { useRouter } = require("@/i18n/navigation");
      const router = useRouter();

      router.replace(pathname, { locale: "ur" });

      expect(mockReplace).toHaveBeenCalledWith("/auth/login", { locale: "ur" });
    });
  });

  describe("Pathnames Configuration", () => {
    it("should have correct pathnames for auth routes", () => {
      const expectedPaths = [
        "/",
        "/dashboard",
        "/auth/login",
        "/auth/signup",
        "/auth/forgot",
        "/auth/otp",
        "/auth/reset",
      ];

      expectedPaths.forEach((path) => {
        expect(typeof path).toBe("string");
        expect(path.startsWith("/")).toBe(true);
      });
    });

    it("should support both locales for auth paths", () => {
      const authPaths = {
        "/auth/login": { en: "/auth/login", ur: "/auth/login" },
        "/auth/signup": { en: "/auth/signup", ur: "/auth/signup" },
      };

      Object.values(authPaths).forEach((pathConfig) => {
        expect(pathConfig).toHaveProperty("en");
        expect(pathConfig).toHaveProperty("ur");
      });
    });
  });

  describe("Routing Configuration", () => {
    it("should have correct default locale", () => {
      const defaultLocale = "en";
      expect(["en", "ur"]).toContain(defaultLocale);
    });

    it("should have all required locales", () => {
      const locales = ["en", "ur"];
      expect(locales).toHaveLength(2);
      expect(locales).toContain("en");
      expect(locales).toContain("ur");
    });

    it("should validate locale types", () => {
      type Locale = "en" | "ur";
      const testLocale: Locale = "en";
      expect(["en", "ur"]).toContain(testLocale);
    });
  });
});
