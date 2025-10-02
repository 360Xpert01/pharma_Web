import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

/**
 * Example component showing how to use translations in your components
 * This demonstrates various translation patterns:
 * - Simple text translations
 * - Nested object translations
 * - Dynamic translations with parameters
 * - Form labels and validation messages
 */

export function TranslationExample() {
  const t = useTranslations();

  // Access nested translations
  const authT = useTranslations("auth.login");
  const dashboardT = useTranslations("dashboard");
  const sharedT = useTranslations("shared");
  const formT = useTranslations("form");

  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t("common.appName")}</CardTitle>
          <CardDescription>{t("metadata.description")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Basic translations */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Basic Translations</h3>
            <p>{t("common.welcome")}</p>
            <p>{sharedT("loading.default")}</p>
          </div>

          {/* Auth translations */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Auth Section</h3>
            <p>{authT("title")}</p>
            <p>{authT("subtitle")}</p>
            <Button>{authT("submitButton")}</Button>
          </div>

          {/* Dashboard translations */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Dashboard Section</h3>
            <p>{dashboardT("title")}</p>
            <p>{dashboardT("sections.metrics")}</p>
            <p>{dashboardT("actions.refresh")}</p>
          </div>

          {/* Form translations */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Form Elements</h3>
            <div className="space-y-2">
              <label>{formT("labels.email")}</label>
              <input
                type="email"
                placeholder={formT("placeholders.email")}
                className="border rounded px-3 py-2 w-full"
              />
              <Button>{formT("buttons.submit")}</Button>
            </div>
          </div>

          {/* Navigation translations */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Navigation</h3>
            <nav className="flex gap-4">
              <a href="/">{t("navigation.home")}</a>
              <a href="/dashboard">{t("navigation.dashboard")}</a>
              <a href="/settings">{t("navigation.settings")}</a>
            </nav>
          </div>

          {/* Time-related translations */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Time References</h3>
            <p>Created {t("time.today")}</p>
            <p>
              Updated 2 {t("time.hours")} {t("time.ago")}
            </p>
          </div>

          {/* Status messages */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Status Messages</h3>
            <div className="space-x-2">
              <span className="px-2 py-1 bg-green-100 text-green-800 rounded">
                {sharedT("status.success")}
              </span>
              <span className="px-2 py-1 bg-red-100 text-red-800 rounded">
                {sharedT("status.error")}
              </span>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded">
                {sharedT("status.warning")}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default TranslationExample;
