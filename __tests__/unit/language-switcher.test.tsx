import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import LanguageSwitcher from "@/components/layout/language-switcher";

// Mock the navigation hooks
jest.mock("@/i18n/navigation", () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

// Mock next-intl hooks
jest.mock("next-intl", () => ({
  useLocale: jest.fn(),
  useTranslations: jest.fn(),
}));

const mockRouter = {
  replace: jest.fn(),
  push: jest.fn(),
  back: jest.fn(),
  forward: jest.fn(),
  refresh: jest.fn(),
};

const mockMessages = {
  common: {
    languageSwitcher: {
      tooltip: "Change Language",
      ariaLabel: "Change language",
      currentLanguage: "Current language",
      clickToChange: "Click to change language",
    },
  },
};

const renderLanguageSwitcher = (locale = "en") => {
  const { useLocale, useTranslations } = require("next-intl");

  useLocale.mockReturnValue(locale);
  useTranslations.mockReturnValue((key: string) => {
    const keys = key.split(".");
    let value = mockMessages.common.languageSwitcher;
    for (const k of keys.slice(1)) {
      value = value[k as keyof typeof value] as any;
    }
    return value || key;
  });

  (useRouter as jest.Mock).mockReturnValue(mockRouter);
  (usePathname as jest.Mock).mockReturnValue("/dashboard");

  return render(
    <NextIntlClientProvider locale={locale} messages={mockMessages}>
      <LanguageSwitcher />
    </NextIntlClientProvider>
  );
};

describe("LanguageSwitcher", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("Rendering", () => {
    it("renders language switcher button", () => {
      renderLanguageSwitcher();

      const button = screen.getByRole("button");
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute("aria-label", "Current language: English");
    });

    it("renders globe icon", () => {
      renderLanguageSwitcher();

      const button = screen.getByRole("button");
      expect(button.querySelector("svg")).toBeInTheDocument();
    });

    it("has correct accessibility attributes", () => {
      renderLanguageSwitcher();

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("title", "Change Language");
      expect(screen.getByText("Change language")).toHaveClass("sr-only");
    });
  });

  describe("Dropdown Menu", () => {
    it("opens dropdown when button is clicked", async () => {
      renderLanguageSwitcher();

      const button = screen.getByRole("button");
      fireEvent.click(button);

      await waitFor(() => {
        expect(screen.getByText("English")).toBeInTheDocument();
        expect(screen.getByText("اردو")).toBeInTheDocument();
      });
    });

    it("displays language options with flags", async () => {
      renderLanguageSwitcher();

      const button = screen.getByRole("button");
      fireEvent.click(button);

      await waitFor(() => {
        const englishFlag = screen.getByLabelText("English flag");
        const urduFlag = screen.getByLabelText("اردو flag");

        expect(englishFlag).toHaveTextContent("🇺🇸");
        expect(urduFlag).toHaveTextContent("🇵🇰");
      });
    });

    it("shows check mark for current language", async () => {
      renderLanguageSwitcher("en");

      const button = screen.getByRole("button");
      fireEvent.click(button);

      await waitFor(() => {
        const checkIcon = screen.getByLabelText("Selected");
        expect(checkIcon).toBeInTheDocument();

        // Check that it's in the English option
        const englishOption = screen.getByText("English").closest('[role="menuitem"]');
        expect(englishOption).toContainElement(checkIcon);
      });
    });
  });

  describe("Language Switching", () => {
    it("calls router.replace when switching to Urdu", async () => {
      renderLanguageSwitcher("en");

      const button = screen.getByRole("button");
      fireEvent.click(button);

      await waitFor(() => {
        const urduOption = screen.getByText("اردو");
        fireEvent.click(urduOption);
      });

      expect(mockRouter.replace).toHaveBeenCalledWith("/dashboard", { locale: "ur" });
    });

    it("calls router.replace when switching to English", async () => {
      renderLanguageSwitcher("ur");

      const button = screen.getByRole("button");
      fireEvent.click(button);

      await waitFor(() => {
        const englishOption = screen.getByText("English");
        fireEvent.click(englishOption);
      });

      expect(mockRouter.replace).toHaveBeenCalledWith("/dashboard", { locale: "en" });
    });

    it("preserves current pathname when switching languages", async () => {
      (usePathname as jest.Mock).mockReturnValue("/auth/login");
      renderLanguageSwitcher("en");

      const button = screen.getByRole("button");
      fireEvent.click(button);

      await waitFor(() => {
        const urduOption = screen.getByText("اردو");
        fireEvent.click(urduOption);
      });

      expect(mockRouter.replace).toHaveBeenCalledWith("/auth/login", { locale: "ur" });
    });
  });

  describe("RTL Support", () => {
    it("applies RTL styles for Urdu language", async () => {
      renderLanguageSwitcher();

      const button = screen.getByRole("button");
      fireEvent.click(button);

      await waitFor(() => {
        const urduOption = screen.getByText("اردو").closest('[role="menuitem"]');
        expect(urduOption).toHaveClass("text-right");
      });
    });

    it("applies font-arabic class for Urdu text", async () => {
      renderLanguageSwitcher();

      const button = screen.getByRole("button");
      fireEvent.click(button);

      await waitFor(() => {
        const urduText = screen.getByText("اردو");
        expect(urduText).toHaveClass("font-arabic");
      });
    });
  });

  describe("Current Locale Detection", () => {
    it("highlights English when current locale is en", async () => {
      renderLanguageSwitcher("en");

      const button = screen.getByRole("button");
      fireEvent.click(button);

      await waitFor(() => {
        const englishOption = screen.getByText("English").closest('[role="menuitem"]');
        expect(englishOption).toHaveClass("bg-accent/50");
      });
    });

    it("highlights Urdu when current locale is ur", async () => {
      renderLanguageSwitcher("ur");

      const button = screen.getByRole("button");
      fireEvent.click(button);

      await waitFor(() => {
        const urduOption = screen.getByText("اردو").closest('[role="menuitem"]');
        expect(urduOption).toHaveClass("bg-accent/50");
      });
    });

    it("shows correct aria-label for current language", () => {
      renderLanguageSwitcher("ur");

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-label", "Current language: اردو");
    });
  });

  describe("Fallback Behavior", () => {
    it("falls back to English when invalid locale is provided", () => {
      const { useLocale } = require("next-intl");
      useLocale.mockReturnValue("invalid");

      renderLanguageSwitcher();

      const button = screen.getByRole("button");
      expect(button).toHaveAttribute("aria-label", "Current language: English");
    });
  });
});
