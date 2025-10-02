# Internationalization (i18n) Setup Guide

This project uses **next-intl** for internationalization with support for English (en) and Urdu (ur) languages.

## 📁 File Structure

```
i18n/
├── messages/
│   ├── en/
│   │   └── index.ts        # English translations
│   └── ur/
│       └── index.ts        # Urdu translations
├── navigation.ts           # Internationalized navigation utilities
├── request.ts             # Next-intl configuration
└── routing.ts             # Routing configuration

middleware.ts              # Middleware for locale detection and routing
next.config.mjs           # Next.js config with i18n plugin
```

## 🌐 Supported Locales

- **English (en)** - Default locale
- **Urdu (ur)** - Secondary locale with complete RTL support

## 🚀 How to Use Translations

### Basic Usage in Components

```tsx
import { useTranslations } from "next-intl";

export function MyComponent() {
  const t = useTranslations();

  return (
    <div>
      <h1>{t("common.appName")}</h1>
      <p>{t("common.welcome")}</p>
    </div>
  );
}
```

### Scoped Translations

```tsx
import { useTranslations } from "next-intl";

export function LoginForm() {
  const t = useTranslations("auth.login");

  return (
    <form>
      <h1>{t("title")}</h1>
      <p>{t("subtitle")}</p>
      <button>{t("submitButton")}</button>
    </form>
  );
}
```

### Multiple Translation Scopes

```tsx
import { useTranslations } from "next-intl";

export function Dashboard() {
  const commonT = useTranslations("common");
  const dashboardT = useTranslations("dashboard");
  const sharedT = useTranslations("shared");

  return (
    <div>
      <h1>{dashboardT("title")}</h1>
      <button>{commonT("save")}</button>
      <p>{sharedT("loading.default")}</p>
    </div>
  );
}
```

## 🔗 Navigation with i18n

### Using the i18n Link Component

```tsx
import { Link } from "@/i18n/navigation";

export function Navigation() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/dashboard">Dashboard</Link>
      <Link href="/auth/login">Login</Link>
    </nav>
  );
}
```

### Programmatic Navigation

```tsx
import { useRouter } from "@/i18n/navigation";

export function MyComponent() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/dashboard");
  };

  return <button onClick={handleClick}>Go to Dashboard</button>;
}
```

## 📝 Translation Structure

All translations are organized by functionality:

### Available Translation Categories

1. **auth** - Authentication related texts
   - `auth.login.*` - Login page
   - `auth.signup.*` - Signup page
   - `auth.forgot.*` - Forgot password
   - `auth.otp.*` - OTP verification
   - `auth.reset.*` - Password reset
   - `auth.validation.*` - Form validation
   - `auth.errors.*` - Error messages

2. **dashboard** - Dashboard specific texts
   - `dashboard.title` - Page title
   - `dashboard.sections.*` - Page sections
   - `dashboard.actions.*` - Action buttons
   - `dashboard.metrics.*` - Metric labels
   - `dashboard.charts.*` - Chart titles
   - `dashboard.table.*` - Table headers and text

3. **layout** - Layout component texts
   - `layout.header.*` - Header component
   - `layout.sidebar.*` - Sidebar component
   - `layout.footer.*` - Footer component
   - `layout.theme.*` - Theme toggle
   - `layout.profile.*` - User profile
   - `layout.navigation.*` - Navigation items

4. **shared** - Common shared texts
   - `shared.loading.*` - Loading states
   - `shared.modal.*` - Modal components
   - `shared.dataTable.*` - Data table
   - `shared.pagination.*` - Pagination
   - `shared.validation.*` - Form validation
   - `shared.actions.*` - Common actions
   - `shared.status.*` - Status messages

5. **form** - Form related texts
   - `form.labels.*` - Form field labels
   - `form.placeholders.*` - Input placeholders
   - `form.buttons.*` - Form buttons
   - `form.validation.*` - Validation messages
   - `form.success.*` - Success messages

6. **home** - Homepage texts
   - `home.hero.*` - Hero section
   - `home.features.*` - Feature descriptions
   - `home.navigation.*` - Home navigation

7. **error** - Error page texts
   - `error.notFound.*` - 404 page
   - `error.globalError.*` - Global error page
   - `error.actions.*` - Error action buttons

8. **common** - Common app-wide texts
   - `common.appName` - Application name
   - `common.welcome` - Welcome message
   - `common.*` - Basic actions (save, cancel, delete, etc.)

9. **metadata** - SEO and metadata
   - `metadata.title` - Page title
   - `metadata.description` - Page description
   - `metadata.keywords` - SEO keywords

10. **navigation** - Main navigation items
    - `navigation.home` - Home link
    - `navigation.dashboard` - Dashboard link
    - `navigation.settings` - Settings link

11. **time** - Time-related words
    - `time.now`, `time.today`, `time.yesterday`
    - `time.minutes`, `time.hours`, `time.days`
    - `time.ago`, `time.in`, `time.at`

## 🎨 RTL Support for Urdu

The Urdu locale includes complete right-to-left (RTL) text support. The layout automatically adjusts based on the selected language.

## 🔄 Adding New Translations

### 1. Add to English (en/index.ts)

```tsx
// Add new translation key
const messages = {
  // ... existing translations
  newSection: {
    title: "New Section Title",
    description: "New section description",
    actions: {
      submit: "Submit",
      cancel: "Cancel",
    },
  },
};
```

### 2. Add Urdu Translation (ur/index.ts)

```tsx
// Add corresponding Urdu translation
const messages = {
  // ... existing translations
  newSection: {
    title: "نیا سیکشن ٹائٹل",
    description: "نیا سیکشن کی تفصیل",
    actions: {
      submit: "جمع کریں",
      cancel: "منسوخ",
    },
  },
};
```

### 3. Use in Components

```tsx
import { useTranslations } from "next-intl";

export function NewComponent() {
  const t = useTranslations("newSection");

  return (
    <div>
      <h1>{t("title")}</h1>
      <p>{t("description")}</p>
      <button>{t("actions.submit")}</button>
      <button>{t("actions.cancel")}</button>
    </div>
  );
}
```

## 🛠 Configuration Files

### middleware.ts

Handles locale detection, routing, and authentication checks per locale.

### i18n/routing.ts

Defines supported locales, default locale, and pathname mappings.

### i18n/navigation.ts

Creates internationalized navigation utilities (Link, useRouter, etc.).

### i18n/request.ts

Configures next-intl request handling and message loading.

### next.config.mjs

Includes the next-intl plugin configuration.

## 🚀 Getting Started

1. **Import translations**: Use `useTranslations()` hook
2. **Scope your translations**: Use `useTranslations('scope')` for specific sections
3. **Use i18n navigation**: Import Link and useRouter from `@/i18n/navigation`
4. **Add new translations**: Update both en and ur translation files
5. **Test both locales**: Switch between `/en/` and `/ur/` routes

## 📖 Examples

Check the `components/examples/translation-example.tsx` file for comprehensive usage examples of all translation patterns.

## 🔍 URL Structure

- English: `https://yourapp.com/en/dashboard`
- Urdu: `https://yourapp.com/ur/dashboard`
- Default (English): `https://yourapp.com/` → redirects to `/en`

The middleware automatically handles locale detection and routing based on user preferences, browser settings, and URL structure.
